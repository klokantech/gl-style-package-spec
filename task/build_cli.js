const fs = require('fs-extra')
const path = require('path')
const yargs = require('yargs')
const build = require('../lib/build')
const mkdirp = require('mkdirp')
const args = yargs
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
  .argv

const buildDir = path.join(args.style_dir, 'build')

/*
fs.removeSync(buildDir);

fs.mkdirsSync(buildDir);

if (needSprite){
  //TODO : build sprite and sprite retina here, instead of in the bash script
}*/

const stylePath = path.join(args.style_dir,'style.json');

const confStr = fs.readFileSync(args.conf, 'utf8');
const styleStr = fs.readFileSync(stylePath, 'utf8');

const jsonconf = JSON.parse(confStr);

let options = {
  styleDir : args.style_dir,
  conf : jsonconf,
  outPath : buildDir
}
mkdirp(buildDir)
const builtStyle = build(styleStr, options)
outPath = path.join(buildDir,'built-style.json');
fs.writeFileSync(outPath, JSON.stringify(builtStyle, null, 2), 'utf8');

const builtStyleDebug = build(styleStr, options)
outPath = path.join(buildDir,'built-style-debug.json');
fs.writeFileSync(outPath, JSON.stringify(builtStyleDebug, null, 2), 'utf8');

const builtStyleOmt = build(styleStr, options)
outPath = path.join(buildDir,'style-omt.json');
fs.writeFileSync(outPath, JSON.stringify(builtStyleOmt, null, 2), 'utf8');


fs.copySync(path.join(__dirname, '..', 'compare.html'), path.join(buildDir, 'compare.html'));
fs.copySync(path.join(__dirname, '..', 'debug.html'), path.join(buildDir, 'debug.html'));
