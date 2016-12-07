var fs = require('fs-extra');

exports.transform = function() {

fs.copySync('index.html', 'build/index.html');

var style = JSON.parse(fs.readFileSync('../style.json', 'utf8'));
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

if(fs.existsSync('../icons')) {
  var slug = process.env.TRAVIS_REPO_SLUG;
  var user = slug[0];
  var repo = slug[1];
  style.sprite = "https://"+user+".github.io/"+repo+"/sprite";
}

style.glyphs = "//fonts.openmaptiles.org/{fontstack}/{range}.pbf";

style.layers.forEach(function(layer) {
  if(layer.layout && layer.layout['text-font']) {
    layer.layout['text-font'] = layer.layout['text-font'].slice(0,1);
  }
});

fs.writeFileSync('build/style.json', JSON.stringify(style, null, 2), 'utf8');

};
