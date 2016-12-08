
exports.adjustStyle = function(opts) {
	
var style = opts.style;

delete style.created;
delete style.draft;
delete style.id;
delete style.modified;
delete style.owner;

if (style.sources['openmaptiles']) {
  style.sources['openmaptiles'] = {
    "type": "vector",
    "url": "https://osm2vectortiles.tileserver.com/v3.json"
  }
}

if(opts.needSprite) {
  var slug = opts.slug.split('/');
  var user = slug[0];
  var repo = slug[1];
  style.sprite = "http://openmaptiles.org/"+repo+"/sprite";
}

style.glyphs = "//fonts.openmaptiles.org/{fontstack}/{range}.pbf";

style.layers.forEach(function(layer) {
  if(layer.layout && layer.layout['text-font']) {
    layer.layout['text-font'] = layer.layout['text-font'].slice(0,1);
  }
});

};
