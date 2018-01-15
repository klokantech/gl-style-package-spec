const fs = require('fs-extra')
const transform = require('../task/transform')
const path = require('path')
const glob = require('glob')
const spritezero = require('@mapbox/spritezero')

module.exports = function (style, options) {
  let styleDir = options.styleDir
  const needSprite = fs.existsSync(path.join(styleDir,'icons'))
  const tileSchemaBasePath = path.join(styleDir,'tileschema_base.json')
  const tileSchemaPoiPath = path.join(styleDir,'tileschema_poi.json')
  const tileSchemaBaseStr = fs.readFileSync(tileSchemaBasePath, 'utf8')
  const tileSchemaPoiStr = fs.readFileSync(tileSchemaPoiPath, 'utf8')

  const tileSchemaBase = JSON.parse(tileSchemaBaseStr)
  const tileSchemaPoi = JSON.parse(tileSchemaPoiStr)

  if(options.ouput === 'production') {
    transform.adjustStyleWithoutTilejson({
      style: style,
      needSprite: needSprite,
      conf_url: options.config
    })
  } else if(options.ouput === 'debug') {
    transform.adjustStyleWithTilejson({
      style: style,
      needSprite: needSprite,
      conf_url: options.config,
      tileschema_base: tileSchemaBase,
      tileschema_poi: tileSchemaPoi,
    })
  } else if(options.ouput === 'omt') {
    transform.adjustStyleForOpenMapTilesCDN({
      style: style,
      needSprite: needSprite,
    })
  }

  if(needSprite) {
    if(!options.outPath) {
      console.error('No output path given')
      return
    }

    const svgs = glob.sync(path.resolve(path.join(styleDir, 'icons', '*.svg')))
      .map(function(f) {
        return {
          svg: fs.readFileSync(f),
          id: path.basename(f).replace('.svg', '')
        }
      })

      options.pixelRatios = options.pixelRatios || [1]
      options.pixelRatios.forEach((pixelRatio) => {
      let pixelRatioPath = `sprite${pixelRatio > 1 ? `@${pixelRatio}x` : ''}`
      let jsonPath = `${options.outPath}/${pixelRatioPath}.json`
      let pngPath = `${options.outPath}/${pixelRatioPath}.png`

      spritezero.generateLayout({ imgs: svgs, pixelRatio: pixelRatio, format: true }, (err, dataLayout) => {
        if (err) {
          console.error(err)
          return
        }
        fs.writeFileSync(jsonPath, JSON.stringify(dataLayout))
      })

      spritezero.generateLayout({ imgs: svgs, pixelRatio: pixelRatio, format: false }, (err, imageLayout) => {
        spritezero.generateImage(imageLayout, function(err, image) {
          if (err) {
            console.error(err)
            return
          }
          fs.writeFileSync(pngPath, image)
        })
      })
    })

  }
  return JSON.stringify(style)
}
