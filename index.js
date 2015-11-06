/* jshint node: true */
'use strict';

var path   = require('path');
var eslint = require('broccoli-lint-eslint');
var jsStringEscape = require('js-string-escape');

function renderErrors(errors) {
  if (!errors || errors.length === 0) {
    return '';
  }

  return errors.map(function(error) {
    return error.line + ':' + error.column + ' - ' +
      error.message + ' (' + error.ruleId + ')';
  }).join('\n');
}

function testGenerator(relativePath, errors) {
  var pass = !errors || errors.length === 0;
  return "QUnit.module('ESLint - " + path.dirname(relativePath) + "');\n" +
         "QUnit.test('" + relativePath + " should pass ESLint', function(assert) { \n" +
         "  assert.ok(" + pass + ", \"" + relativePath + " shoud pass ESLint.\\n\\n" + jsStringEscape(renderErrors(errors)) + "\");\n" +
         "});\n";
}

module.exports = {
  name: 'ember-cli-qunit-eslint',
  lintTree: function(type, tree) {
    return eslint(tree, { testGenerator: testGenerator });
  }
};
