var fs = require('fs-extra');
var adjustStyle = require('./transform.js').adjustStyle;


fs.copySync('index.html', 'build/index.html');

var style = JSON.parse(fs.readFileSync('../style.json', 'utf8'));
var needSprite = fs.existsSync('../icons');
var slug = process.env.TRAVIS_REPO_SLUG;

adjustStyle({
  style: style,
  needSprite: needSprite,
  slug: slug
});

fs.writeFileSync('build/style.json', JSON.stringify(style, null, 2), 'utf8');
