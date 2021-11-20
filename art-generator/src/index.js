const fs = require('fs')
const {createCanvas, loadImage} = require('canvas')

const canvas = createCanvas(1000, 1000)

const ctx = canvas.getContext('2d')

const saveLayer = canvas => {
  fs.writeFileSync('./src/output/newImage.png', canvas.toBuffer('image/png'))
}

const drawLayer = async () => {
  const image = await loadImage('./src/layers/ball/red eye ball_sr.png')
  // ctx.drawImage(image, x, y, width, height)
  await ctx.drawImage(image, 0, 0, 1000, 1000)
  saveLayer(canvas)
}

module.exports = {
  drawLayer,
}
