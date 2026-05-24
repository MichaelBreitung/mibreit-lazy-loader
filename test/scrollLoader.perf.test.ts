/**
 * Performance test harness for mibreit-lazy-loader
 *
 * Measures the time from a scroll event to all visible elements having their
 * loading triggered (marker removed), using a real Chromium instance via
 * Puppeteer. A MutationObserver injected purely inside the page tracks when
 * loading is triggered — no changes to library code are required.
 *
 * Run via: npm run test:perf
 */

import fs from 'fs';
import path from 'path';
import puppeteer, { Browser, Page } from 'puppeteer';
import { describe, it, beforeAll, afterAll, beforeEach, afterEach, expect } from 'vitest';

// ---------------------------------------------------------------------------
// Read assets from disk once
// ---------------------------------------------------------------------------

const iifeScript = fs.readFileSync(path.join(__dirname, '../lib-iife/mibreitLazyLoader.min.js'), {
  encoding: 'utf8',
});

// ---------------------------------------------------------------------------
// Page HTML factory — generates N lazy img elements inline
// ---------------------------------------------------------------------------

function buildPageMarkup(elementCount: number): string {
  const imgs = Array.from(
    { length: elementCount },
    (_, i) =>
      `<img class="mbll__marker" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" width="960" height="640" alt="perf test image ${i}">`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <style>
      body { margin: 0; }
      #container img { 
        display: block; 
        width: 960px;
      }
      .mbll__marker { display: none !important; }
    </style>
  </head>
  <body>
    <div id="container">
      ${imgs}
    </div>
  </body>
</html>`;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const VIEWPORT = { width: 1280, height: 800 };
const WARMUP_RUNS = 2;
const MEASURED_RUNS = 10;
const SCROLL_Y = 10000;

/**
 * Measures how long (in ms) it takes from dispatching a scroll event until
 * `expectedLoads` elements have had their marker class removed.
 *
 * The page is re-initialised before each measurement by re-injecting the IIFE
 * and re-creating the LazyLoader, so the LazyLoader's internal state is always
 * fresh. A MutationObserver inside the page captures the exact timestamp.
 */
async function measureScrollTriggerTime(
  page: Page,
  markup: string,
  scrollY: number,
  expectedLoads: number
): Promise<number> {
  await page.setContent(markup, { waitUntil: 'domcontentloaded' });

  await page.evaluate((code: string) => {
    const script = document.createElement('script');
    script.textContent = code;
    document.head.appendChild(script);
  }, iifeScript);

  await page.evaluate(() => {
    (window as any).__lazyLoader = (window as any).mibreitLazyLoader.createLazyLoader('#container .mbll__marker', {
      mode: (window as any).mibreitLazyLoader.ELazyMode.WINDOWED_SCROLL,
      useSurrogate: true,
    });
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  return page.evaluate(
    ({ scrollY, expectedLoads }: { scrollY: number; expectedLoads: number }) => {
      return new Promise<number>((resolve) => {
        let loadCount = 0;
        const start = performance.now();

        const observer = new MutationObserver((mutations) => {
          console.log('mutation fired:', mutations.length, 'mutations, loadCount now', loadCount);
          for (const mutation of mutations) {
            console.log(
              '  type:',
              mutation.type,
              'attr:',
              mutation.attributeName,
              'target tag:',
              (mutation.target as HTMLElement).tagName,
              'class:',
              (mutation.target as HTMLElement).className
            );
            if (
              mutation.type === 'attributes' &&
              mutation.attributeName === 'class' &&
              !(mutation.target as HTMLElement).getAttribute('class')?.includes('mbll__marker')
            ) {
              loadCount++;
              if (loadCount >= expectedLoads) {
                observer.disconnect();
                resolve(performance.now() - start);
              }
            }
          }
        });

        // Only observe elements that are still unloaded (still have the marker class)
        document.querySelectorAll('#container img.mbll__marker').forEach((img) => {
          observer.observe(img, { attributes: true, attributeFilter: ['class'] });
        });

        window.scrollTo(0, scrollY);
        window.dispatchEvent(new Event('scroll'));
      });
    },
    { scrollY, expectedLoads }
  );
}

/**
 * Runs warmup + measured iterations and logs avg/min/max timing.
 */
async function benchmark(page: Page, markup: string, expectedLoads: number, label: string): Promise<number> {
  for (let i = 0; i < WARMUP_RUNS; i++) {
    await measureScrollTriggerTime(page, markup, SCROLL_Y, expectedLoads);
  }

  const times: number[] = [];
  for (let i = 0; i < MEASURED_RUNS; i++) {
    const t = await measureScrollTriggerTime(page, markup, SCROLL_Y, expectedLoads);
    times.push(t);
  }

  const avg = times.reduce((a, b) => a + b, 0) / times.length;
  const min = Math.min(...times);
  const max = Math.max(...times);

  console.log(`\n[PERF] ${label}`);
  console.log(`  runs: ${MEASURED_RUNS}  avg: ${avg.toFixed(2)}ms  min: ${min.toFixed(2)}ms  max: ${max.toFixed(2)}ms`);
  console.log(`  individual: ${times.map((t) => t.toFixed(1)).join(', ')}`);

  return avg;
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe('ScrollLoader performance baseline', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.setViewport(VIEWPORT);
  });

  afterEach(async () => {
    await page.close();
  });

  it('measures trigger time with 500 elements', async () => {
    const markup = buildPageMarkup(500);
    const avg = await benchmark(page, markup, 1, '500 elements — initial viewport');
    expect(avg).toBeGreaterThan(0);
  }, 60_000);

  it('measures trigger time with 1000 elements', async () => {
    const markup = buildPageMarkup(1000);
    const avg = await benchmark(page, markup, 1, '1000 elements — initial viewport');
    expect(avg).toBeGreaterThan(0);
  }, 60_000);

  it('measures trigger time with 2000 elements', async () => {
    const markup = buildPageMarkup(2000);
    const avg = await benchmark(page, markup, 1, '2000 elements — initial viewport');
    expect(avg).toBeGreaterThan(0);
  }, 60_000);
});
