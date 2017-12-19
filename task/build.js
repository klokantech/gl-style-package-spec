var fs = require('fs-extra');
var transform = require('./transform.js');
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
  .options({
    conf: {
      describe: 'The conf file with the urls in it',
      type: 'string',
      demandOption: true,
      nargs: 1
    }
  })
  .help('h')
  .alias('h', 'help')
  .argv;

const buildDir = path.join(args.style_dir,'build');
var needSprite = fs.existsSync(path.join(args.style_dir,'icons'));

/*
fs.removeSync(buildDir);

fs.mkdirsSync(buildDir);

if (needSprite){
  //TODO : build sprite and sprite retina here, instead of in the bash script
}*/

var stylePath = path.join(args.style_dir,'style.json');
var styleStr = fs.readFileSync(stylePath, 'utf8');
var confStr = fs.readFileSync(args.conf, 'utf8');
var jsonconf = JSON.parse(confStr);
var style = JSON.parse(styleStr);

var outPath;

transform.adjustStyleWithoutTilejson({
  style: style,
  needSprite: needSprite,
  conf_url: jsonconf
} );
outPath = path.join(buildDir,'built-style.json');
fs.writeFileSync(outPath, JSON.stringify(style, null, 2), 'utf8');

transform.adjustStyleForOpenMapTilesCDN({
  style: style,
  needSprite: needSprite,
});
outPath = path.join(buildDir,'style-omt.json');
fs.writeFileSync(outPath, JSON.stringify(style, null, 2), 'utf8');


fs.copySync(path.join(__dirname, '..', 'compare.html'), path.join(buildDir, 'compare.html'));
fs.copySync(path.join(__dirname, '..', 'debug.html'), path.join(buildDir, 'debug.html'));
