var fs = require('fs-extra');
var mbgl = require('@mapbox/mapbox-gl-style-spec');
var execSync = require('child_process').execSync;
var checkFonts = require('./check-fonts');
const path = require('path');
var yargs = require('yargs');

let args = yargs
  .usage('Usage: $0 [options]')
  .options({
    style_dir: {
      describe: 'The folder with the style inside it',
      type: 'string',
      demandOption: true,
      nargs: 1
    }
  })
  .help('h')
  .alias('h', 'help')
  .argv;

var stylePath = path.join(args.style_dir,'style.json');
var styleString = fs.readFileSync(stylePath, 'utf8');
var style = JSON.parse(styleString);

var errors = mbgl.validate(style);
if(errors && errors.length) {
  console.error(
      'ERROR: The style is not valid according to mapbox-gl-style-spec.');
  console.error(errors);
  process.exit(1);
}

checkFonts(style);

if(!style.sources.basemap) {
  console.log('WARNING: Style does not contain "basemap" source.');
}
if(!style.sources.poi) {
  console.log('WARNING: Style does not contain "poi" source.');
}
if(!style.metadata['openmaptiles:version']) {
  console.log('WARNING: Style does not contain "openmaptiles:version" metadata.');
}

var formattedStyleString = mbgl.format(style);
if(styleString.trim() !== formattedStyleString.trim()) {
  console.log(
    'WARNING: Style is not formatted. You should use "gl-style-format"\n' +
    'before commit. See https://github.com/mapbox/mapbox-gl-js/blob/master/src/style-spec/README.md');
}
