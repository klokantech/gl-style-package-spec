var fs = require('fs-extra');
var transform = require('./transform.js');


fs.copySync('index.html', 'build/index.html');


var needSprite = fs.existsSync('../icons');
var slug = process.env.TRAVIS_REPO_SLUG;

var stylePath = '../style.json';
var styleStr = fs.readFileSync(stylePath, 'utf8');

var langCfgPath = '../lang-fallback.json';
if(fs.existsSync(langCfgPath)) {
  var langCfgStr = fs.readFileSync(langCfgPath, 'utf8');
  var langCfg = JSON.parse(langCfgStr);
}

var style, outPath;
if(langCfg) {
  style = JSON.parse(styleStr);
  transform.adjustStyleForCdn({
    style: style,
    needSprite: needSprite,
    slug: slug,
    langCfg: langCfg
  });
  fs.writeFileSync('build/style-cdn.json', JSON.stringify(style, null, 2), 'utf8');
}

style = JSON.parse(styleStr);
transform.adjustStyleForCdn({
  style: style,
  needSprite: needSprite,
  slug: slug
});
outPath = langCfg ? 'build/style-cdn-undecorated.json' : 'build/style-cdn.json';
fs.writeFileSync(outPath, JSON.stringify(style, null, 2), 'utf8');

if(langCfg) {
  style = JSON.parse(styleStr);
  transform.adjustStyleForLocal({
    style: style,
    needSprite: needSprite,
    langCfg: langCfg
  });
  fs.writeFileSync('build/style-local.json', JSON.stringify(style, null, 2), 'utf8');
}

style = JSON.parse(styleStr);
transform.adjustStyleForLocal({
  style: style,
  needSprite: needSprite
});
outPath = langCfg ? 'build/style-local-undecorated.json' : 'build/style-local.json';
fs.writeFileSync(outPath, JSON.stringify(style, null, 2), 'utf8');

style = JSON.parse(styleStr);
transform.adjustStyleForMapbox({
  style: style,
  needSprite: needSprite,
  slug: slug
});
fs.writeFileSync('build/style-mb.json', JSON.stringify(style, null, 2), 'utf8');
