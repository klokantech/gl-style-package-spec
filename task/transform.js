var langFallback = require('./lang-fallback.js');
var decorateLayers = require('./decorate-layers.js');

exports.adjustStyleForCdn = function(opts) {

	var style = opts.style;

	delete style.created;
	delete style.draft;
	delete style.modified;
	delete style.owner;

	if (style.sources['openmaptiles']) {
	  style.sources['openmaptiles'] = {
	    "type": "vector",
	    "url": "https://api.maptiler.com/tiles/v3/tiles.json?key=Xfb74aIJXmRrUdfJyYo5"
	  }
	}

	if(opts.needSprite && opts.slug) {
	  var slug = opts.slug.split('/');
	  var user = slug[0];
	  var repo = slug[1];
	  style.sprite = "https://"+user+".github.io/"+repo+"/sprite";
	} else {
	  delete style.sprite;
	}

	style.glyphs = "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=Xfb74aIJXmRrUdfJyYo5";

	var langCfg = opts.langCfg;
	if(langCfg) {
		langFallback.decorate(style, langCfg);
	}

	var decorateCfg = opts.decorateCfg;
	if(decorateCfg) {
		decorateLayers.decorate(style, decorateCfg);
	}

};


exports.adjustStyleForLocal = function(opts) {

	var style = opts.style;

	delete style.created;
	delete style.draft;
	delete style.id;
	delete style.modified;
	delete style.owner;


	if (style.sources['openmaptiles']) {
		var version = 'v'+style.metadata['openmaptiles:version'].split('.')[0];
	  style.sources['openmaptiles'] = {
	      "type": "vector",
	      "url": "mbtiles://{"+version+"}"
	  }
	}

	if(opts.needSprite) {
	  style.sprite = "{styleJsonFolder}/sprite";
	} else {
	  delete style.sprite;
	}

	style.glyphs = "{fontstack}/{range}.pbf";

	var langCfg = opts.langCfg;
	if(langCfg) {
		langFallback.decorate(style, langCfg);
	}

	var decorateCfg = opts.decorateCfg;
	if(decorateCfg) {
		decorateLayers.decorate(style, decorateCfg);
	}

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
