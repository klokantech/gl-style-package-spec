
exports.adjustStyleForCdn = function(opts) {

	var style = opts.style;

	delete style.created;
	delete style.draft;
	delete style.modified;
	delete style.owner;

	if (style.sources['openmaptiles']) {
	  style.sources['openmaptiles'] = {
	    "type": "vector",
	    "url": "https://free.tilehosting.com/data/v3.json?key=tXiQqN3lIgskyDErJCeY"
	  }
	}

	if(opts.needSprite) {
	  var slug = opts.slug.split('/');
	  var user = slug[0];
	  var repo = slug[1];
	  style.sprite = "https://"+user+".github.io/"+repo+"/sprite";
	} else {
	  delete style.sprite;
	}

	style.glyphs = "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf";

	style.layers.forEach(function(layer) {
	  if(layer.layout && layer.layout['text-font']) {
	    layer.layout['text-font'] = layer.layout['text-font'].slice(0,1);
	  }
	});

};


exports.adjustStyleForLocal = function(opts) {

	var style = opts.style;

	delete style.created;
	delete style.draft;
	delete style.id;
	delete style.modified;
	delete style.owner;

	if (style.sources['openmaptiles']) {
	  style.sources['openmaptiles'] = {
	      "type": "vector",
	      "url": "mbtiles://{openmaptiles}"
	  }
	}

	if(opts.needSprite) {
	  style.sprite = "{styleJsonFolder}/sprite";
	} else {
	  delete style.sprite;
	}

	style.glyphs = "{fontstack}/{range}.pbf";

};
