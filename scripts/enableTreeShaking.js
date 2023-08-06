const replace = require('replace-in-file');

// Treeshaking in Webpack does not work for ES5 classes, unless 
// they are marked as pure. With this trick, treeshaking will
// work properly in code that uses the lazy loader library
const options = {
  files: 'lib/components/**/*.js',
  from: /\/\*\* \@class \*\//g,
  to: '/*@__PURE__*/',
};

try {
  const results = replace.sync(options);
  console.log("->", results);
} catch (error) {
  console.error('Error occurred:', error);
}