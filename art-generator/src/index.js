const fs = require('fs')
const myArgs = process.argv.slice(2)
const {createCanvas, loadImage} = require('canvas')

const {layers, width, height} = require('./input')

const canvas = createCanvas(width, height)
const ctx = canvas.getContext('2d')

const edition = myArgs.length > 0 ? Number(myArgs[0]) : 1

let metadata = []
let attributes = []
let hash = []
let decodedHash = []

const addMetadata = _edition => {
  let dateTime = Date.now()
  let tempMetadata = {
    hash: hash.join(''),
    edition: _edition,
    date: dateTime,
    decodedHash,
    attributes,
  }
  metadata.push(tempMetadata)
  decodedHash = []
  attributes = []
  hash = []
}

const addAttributes = (_element, _layer) => {
  let tempAttr = {
    id: _element.id,
    layer: _layer.name,
    name: _element.name,
    rarity: _element.rarity,
  }
  attributes.push(tempAttr)
  hash.push(_layer.id)
  hash.push(_element.id)
  decodedHash.push({[_layer.id]: _element.id})
}

const saveLayer = (_canvas, _edition) => {
  fs.writeFileSync(
    `./src/output/${_edition}.png`,
    _canvas.toBuffer('image/png'),
  )
}

const drawLayer = async (_layer, _edition) => {
  let element =
    _layer.elements[Math.floor(Math.random() * _layer.elements.length)]
  addAttributes(element, _layer)

  // const image = await loadImage('./src/input/ball/red eye ball_sr.png')
  // // ctx.drawImage(image, x, y, width, height)
  // await ctx.drawImage(image, 0, 0, width, height)
  // saveLayer(canvas)
  const image = await loadImage(`${_layer.location}${element.fileName}`)
  // ctx.drawImage(image, x, y, width, height)
  await ctx.drawImage(
    image,
    _layer.position.x,
    _layer.position.y,
    _layer.size.width,
    _layer.size.height,
  )
  console.log(
    `I created the ${_layer.name} layer, and choose element ${element.name}`,
  )
  saveLayer(canvas, _edition)
}

const startApp = async () => {
  for (let i = 1; i <= edition; i++) {
    await layers.forEach(layer => drawLayer(layer, i))
    addMetadata(i)
  }

  fs.readFile('./src/output/_metadata.json', (err, data) => {
    if (err) throw new Error(err)

    fs.writeFileSync('./src/output/_metadata.json', JSON.stringify(metadata))
  })
}

module.exports = {
  startApp,
}

//! LAYER EXAMPLE
// {
//   id: 1,
//   name: 'background',
//   location: `${dir}/background/`,
//   elements: getElements(`${dir}/background/`),
//   position: {x: 0, y: 0},
//   size: {width, height},
// },

//! ELEMENTS
// [
//   {
//     id: 1,
//     name: 'high top',
//     fileName: 'high top.png',
//     rarity: 'original'
//   },
//   {
//     id: 2,
//     name: 'low top',
//     fileName: 'low top.png',
//     rarity: 'original'
//   },
//   {
//     id: 3,
//     name: 'tilted top_r',
//     fileName: 'tilted top_r.png',
//     rarity: 'rare'
//   }
// ]
