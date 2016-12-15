var fs = require('fs-extra');
var mbgl = require('mapbox-gl-style-spec');
var execSync = require('child_process').execSync;
var checkFonts = require('./check-fonts');

var stylePath = '../style.json';
var style = JSON.parse(fs.readFileSync(stylePath, 'utf8'));

var errors = mbgl.validate(style);
if(errors && errors.length) {
  console.error(
      'ERROR: The style is not valid according to mapbox-gl-style-spec.');
  console.error(errors);
  process.exit(1);
}

if(!style.sources.openmaptiles) {
  console.log('WARNING: Style does not contain "openmaptiles" source.');
}
if(!style.metadata['openmaptiles:version']) {
  console.log('WARNING: Style does not contain "openmaptiles:version" metadata.');
}

checkFonts(style);
