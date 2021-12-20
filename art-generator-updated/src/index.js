const fs = require('fs')
// const myArgs = process.argv.slice(2)
const {createCanvas, loadImage} = require('canvas')

const {
  layers,
  width,
  height,
  description,
  baseImageURI,
  startEditionFrom,
  endEditionAt,
  editionSize,
  rarityWeight,
} = require('./layers')

const canvas = createCanvas(width, height)
const ctx = canvas.getContext('2d')

// if you execute "node index.js 2" myArgs[0] = 2
// const editionSize = myArgs.length > 0 ? Number(myArgs[0]) : 1

let metadataList = []
let attributesList = []
let hash = []
let decodedHash = []
let dnaList = []

const getRarity = _editionCount => {
  let rarity = ''
  rarityWeight.forEach(weight => {
    if (_editionCount >= weight.from && _editionCount <= weight.to) {
      rarity = weight.value
    }
  })
  return rarity
}

//* 1. execute
//! length is a number // ex: 1, 12, 23, 24, ...
//! return result // ex: 10434741415053
const createDna = (_layers, _rarity) => {
  let randomNumbers = []
  _layers.forEach(layer => {
    let num = Math.floor(Math.random() * layer.elements[_rarity].length)
    randomNumbers.push(num)
  })

  return randomNumbers
}

//* 2. check
//! _dna is a number // ex: 10434741415053
//! returns boolean // ex: true
const isDnaUnique = (_dnaList = [], _dna = []) => {
  const foundedDna = _dnaList.find(dna => dna.join('') === _dna.join(''))
  return !foundedDna
}

//* 3. construct
//! _dna is a number // ex: 10434741415053
//! _layers is an array // ex: below
//   [{
//     position: {x: 0, y: 0},
//     size: {width: 1000, height: 1000},
//     selectedElement: { id: 3, name: 'small', fileName: 'small.png', rarity: 'original' }
//   }... ]
//! returns an array which has objects like under the console.log
const constructLayerToDna = (_dna = [], _layers = [], _rarity) => {
  let mappedDnaToLayers = _layers.map((layer, index) => {
    let selectedElement = layer.elements[_rarity][_dna[index]]

    return {
      position: layer.position,
      size: layer.size,
      selectedElement,
    }
  })

  console.log(mappedDnaToLayers)
  // [{
  //   position: { x: 0, y: 0 },
  //   size: { width: 1000, height: 1000 },
  //   selectedElement: { id: 3, name: 'small', fileName: 'small.png', rarity: 'original' }
  // }...],
  return mappedDnaToLayers
}

//* 4. execute
//! _layer is an object // ex: below
// {
//   position: { x: 0, y: 0 },
//   size: { width: 1000, height: 1000 },
//   selectedElement: { id: 3, name: 'small', fileName: 'small.png', rarity: 'original' }
// }
//! returns a promise
const loadLayerImage = async _layer =>
  new Promise(async resolve => {
    const image = await loadImage(_layer.selectedElement.path)
    resolve({
      layer: _layer,
      loadedImage: image,
    })
  })

//* 5. execute for layer
const drawBackground = () => {
  ctx.fillStyle = generateColor()
  ctx.fillRect(0, 0, width, height)
}
//* 5-1. execute
const generateColor = () => {
  let hue = Math.floor(Math.random() * 360)
  let saturation = Math.floor(Math.random() * 100)
  let lightness = Math.floor(Math.random() * 100)
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

//* 6. execute
//! _element is an object // ex: below
// {
//   layer: {
//     position: { x: 0, y: 0 },
//     size: { width: 1000, height: 1000 },
//     selectedElement: { id: 3, name: 'small', fileName: 'small.png', rarity: 'original' }
//   },
//   loadedImage: <Image>
// }
const drawElement = _element => {
  // ctx.drawImage(image, x, y, width, height)
  ctx.drawImage(
    _element.loadedImage,
    _element.layer.position.x,
    _element.layer.position.y,
    _element.layer.size.width,
    _element.layer.size.height,
  )
  addAttributes(_element)
}
//* 6-1. execute
//! _element is the same object as in drawElement
const addAttributes = _element => {
  let selectedElement = _element.layer.selectedElement
  attributesList.push({
    name: selectedElement.name,
    rarity: selectedElement.rarity,
  })
}

//* 7. execute
const signImage = _text => {
  ctx.font = '30px Arial'
  ctx.fillStyle = '#ffffff'
  ctx.textBaseline = 'top'
  ctx.textAlign = 'left'
  ctx.fillText(_text, 40, 40)
}

//* 8. execute
const saveImage = _editionCount => {
  fs.writeFileSync(
    `./src/output/${_editionCount}.png`,
    canvas.toBuffer('image/png'),
  )
}

//* 9. execute
//! _dna is a number // ex: 10434741415053
//! _editionCount is a number // ex: 1
const addMetadata = (_dna, _editionCount) => {
  let dateTime = Date.now()
  let tempMetadata = {
    dna: _dna.join(''),
    name: `#${_editionCount}`,
    description,
    image: `${baseImageURI}/${_editionCount}`,
    edition: _editionCount,
    date: dateTime,
    attributes: attributesList,
  }

  metadataList.push(tempMetadata)
  attributesList = []
}

//* 10. execute
const writeMetadata = () => {
  fs.writeFileSync('./src/output/_metadata.json', JSON.stringify(metadataList))
}

const startApp = async () => {
  writeMetadata('')
  let editionCount = startEditionFrom

  while (editionCount <= endEditionAt) {
    let rarity = getRarity(editionCount)
    let newDna = createDna(layers, rarity)
    console.log(`DNA list ${dnaList}`) // []

    if (isDnaUnique(dnaList, newDna)) {
      dnaList.push(newDna)
      let results = constructLayerToDna(newDna, layers, rarity)
      let loadedElements = [] // promise array

      results.forEach(async layer => loadedElements.push(loadLayerImage(layer)))

      await Promise.all(loadedElements).then(async elementsArray => {
        // clear the canvas background
        ctx.clearRect(0, 0, width, height)
        // draw background color
        drawBackground()
        // draw each element
        elementsArray.forEach(async element => {
          drawElement(element)
        })
        // sign the image by the edition number
        signImage(`#${editionCount}`)
        // save the image
        saveImage(editionCount)
        // add metadata to metadataList array
        addMetadata(newDna, editionCount)
        console.log(`Created edition: ${editionCount} by DNA: ${newDna}`) // 10434741415053
      })

      // add the new dna to the dna list
      dnaList.push(newDna)
      // increment the edition count
      editionCount++
    } else {
      // if the dna is not unique, then print the log
      console.log('DNA exists')
    }
  }
  // write the metadata to the file
  writeMetadata()
}

module.exports = {
  startApp,
}
