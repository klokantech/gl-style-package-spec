
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

	style.glyphs = "https://free.tilehosting.com/fonts/{fontstack}/{range}.pbf?key=tXiQqN3lIgskyDErJCeY";

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


exports.adjustStyleForMapbox = function(opts) {

	var style = opts.style;

	delete style.created;
	delete style.draft;
	delete style.modified;

	var metadata = style.metadata || {};

	style.owner = style.owner || metadata['openmaptiles:mapbox:owner'];

	if (style.sources['openmaptiles']) {
		var omtsrc = style.sources['openmaptiles'];
		if(!omtsrc.url.startsWith('mapbox://')) {
			var sourceUrl = metadata['openmaptiles:mapbox:source:url']
					|| "mapbox://<YOUR TILESET'S MAP ID>"
			omtsrc.url = sourceUrl;
		}
	}

	if(opts.needSprite) {
	  style.sprite = "mapbox://sprites/"+style.owner+"/"+style.id;
	} else {
	  delete style.sprite;
	}

	style.glyphs = "mapbox://fonts/"+style.owner+"/{fontstack}/{range}.pbf";

};
