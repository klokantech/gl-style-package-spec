# "GL Style Package" specification

Best practice for storing complete "GL style" for a map in a GitHub repo, gist, directory or a zip package.

## Map style preview
After following steps you will get free preview of your map on github.io pages like [OSM Bright GL style preview](https://openmaptiles.github.io/osm-bright-gl-style/#3.46/47.20/14.98).


### Requirements
- GitHub repository
- Style saved as a `style.json` in root
- Icons used in style saved as SVG files inside `icons/`

### Installation
Warning: Following steps will automatically create/rewrite content of you `gh-pages` branch on every push you make.
- [Enable Travis for your repository](https://docs.travis-ci.com/user/getting-started/#To-get-started-with-Travis-CI%3A)
- Copy `.travis.sample.yml` into your repository master as `.travis.yml`
- Generate [personal access token](https://github.com/settings/tokens/new) if you don't have any
- Encrypt it using `travis encrypt -r [user]/[repo] GITHUB_TOKEN=[the token here]` (install travis using `gem install travis`)
  - You can use also `--add` option when running this command to automatically append encrypted variable into your `.travis.yml`.
- Insert following to your `.travis.yml` (if it was not inserted using `--add` option):
```
env:
  global:
    - secure: [encrypted token here without quotes]
```
- Visit `https://[user].github.io/[repo]` in your browser.


## Ideas
Discussion, specification and validator for correctness and completeness of storing map styles described in MapBox GL Style JSON together with all related assets in a single directory or github repository.

The spec should solve these issues:

- Storage of complete JSON GL styles in Github / Gist with revisions (versioning) and possible collaboration of multiple people / designers
- Specification of the structure of such repo, verifiable by a script
- Guarantee, that the style and all assets are included - and available in an editable form (sprites in SVG format, correctly linked fonts) - not in a derivative form, verifiable by a script
- Presence of license of the style (code+creative), part of verification
- It should be possible to deploy offline or deploy to a tileserver (TileServerGL or another)
- It should be possible to load & save the styles with an editor (Maputnik or another)
- Fonts may be saved in a separate repo - for easier reuse
- JSON style or another metadata file may contain information about compatibility requirements for the fonts, vectortiles, etc
- Ensure the style package (.zip made from GitHub repo) can be downloaded and used offline in a standalone mobile app

This repo should contain a script (to be run on Travis), which will validate the files with a set of tests, report potential issues and convert the original assets into an online preview hosted on gh-pages of the same github repo.

Related materials:
- Mapbox GL Style Spec: https://github.com/mapbox/mapbox-gl-style-spec & https://www.mapbox.com/mapbox-gl-style-spec/
- Process of compiling of assets described at: https://github.com/klokantech/osm2vectortiles-gl-styles

The spec/travis scripts may be applied on the default styles of OSM2VectorTiles, OpenMapTiles, KlokanTech, OSM Liberty, etc.
