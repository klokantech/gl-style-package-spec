# "GL Style Builder" package

Some tools to build, debug and publish GL Style at Qwant


## Build
The build command will generate some sprites out of your icons folder and create style files with the url of the tileservers.

#### Requirements
- A repository with
  - Style saved as a `style.json` in root
  - Icons used in style saved as SVG files inside `icons/`
- A json configuration file, with some url in it. See `prod_conf.json` if you need inspiration

#### Usage
`npm run build_all -- PATH/TO/YOUR/MAPSTYLE/ PATH/TO/YOUR/CONF`

You can also define this package as a dependency of your style node package.

### Test
`npm test -- PATH/TO/YOUR/MAPSTYLE/` to check if your style is ok

## Compare
You can use the built `compare.html` page to check your style builds.

You need to insert a valid Mapbox token in the built `compare.html` page.

## Debug
You can use the built `debug.html` page to inspect your tiles et check your style

## Publish
The publish command will deploy your built styles as a github release (TODO)
