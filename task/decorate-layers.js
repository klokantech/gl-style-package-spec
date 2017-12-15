exports.decorate = function(style, cfg) {
  var layers = style.layers;
  var layerFilter = cfg.layerFilter;
  var decorator = cfg.decorator;

  for (var i = layers.length-1; i >= 0; i--) {
    var layer = layers[i];
    if(!layerFilter(layer)) {
      continue;
    }
    var decLayers = decorator(layer);
    layers.splice.apply(layers, [i, 1].concat(decLayers));
  }
};
