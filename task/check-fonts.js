var fs = require('fs-extra');

var layersMissingFontSpec = [];

var stylePath = '../style.json';
var style = JSON.parse(fs.readFileSync(stylePath, 'utf8'));

style.layers.forEach(function(layer) {
  if (layer.layout &&
      layer.layout['text-field'] &&
      (!layer.layout['text-font'] || layer.layout['text-font'].length === 0)) {
    layersMissingFontSpec.push(layer.id);
  }
});

if (layersMissingFontSpec.length > 0) {
  console.error(
    'ERROR: The following layers specify "text-field", but no "text-font":');
  console.error('    ' + layersMissingFontSpec.join(', '));
  process.exit(1);
}
