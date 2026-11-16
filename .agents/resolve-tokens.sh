#!/usr/bin/env bash
#
# Substitute the repository-specific tokens into every file under the agent
# root. Driven entirely by token-mapping.json, created once by the
# `onboarding` skill and never hand-edited afterwards. Deterministic and
# idempotent: re-running it (e.g. after onboarding.sh refreshes the generic
# payload) reproduces the exact same result, so it never shows up as noise in
# a diff against the previous run.
#
# Usage: ./resolve-tokens.sh AGENT_ROOT
#
set -euo pipefail

ROOT="${1:?usage: resolve-tokens.sh AGENT_ROOT}"
MAPPING="$ROOT/token-mapping.json"

command -v jq >/dev/null 2>&1 || { echo "error: jq is required" >&2; exit 1; }
[[ -f "$MAPPING" ]] || { echo "error: $MAPPING not found — run the onboarding skill first" >&2; exit 1; }
jq empty "$MAPPING" || { echo "error: $MAPPING is not valid JSON" >&2; exit 1; }

# ------------------------------------------------------- simple single-line tokens

DOC_ROOT="$(jq -r '.DOC_ROOT' "$MAPPING")"
TRUNK_BRANCH="$(jq -r '.TRUNK_BRANCH' "$MAPPING")"
TICKET_SYSTEM="$(jq -r '.TICKET_SYSTEM' "$MAPPING")"
TICKET_PROFILE="$(jq -r '.TICKET_PROFILE' "$MAPPING")"
SCRATCH_DIR="$(jq -r '.SCRATCH_DIR' "$MAPPING")"

while IFS= read -r file; do
    sed -i \
        -e "s|{{DOC_ROOT}}|$DOC_ROOT|g" \
        -e "s|{{TRUNK_BRANCH}}|$TRUNK_BRANCH|g" \
        -e "s|{{TICKET_SYSTEM}}|$TICKET_SYSTEM|g" \
        -e "s|{{TICKET_PROFILE}}|$TICKET_PROFILE|g" \
        -e "s|{{SCRATCH_DIR}}|$SCRATCH_DIR|g" \
        "$file"
done < <(find "$ROOT" -type f -name '*.md')

echo "resolved repository tokens in $ROOT"
