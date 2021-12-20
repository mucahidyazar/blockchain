const fs = require('fs')

const width = 1000
const height = 1000
const dir = __dirname
const description = 'This is an NFT made by the coolest generative code.'
const baseImageURI = 'localhost:3000'
const startEditionFrom = 1
const endEditionAt = 10
const editionSize = 1000
const rarityWeight = [
  {value: 'super_rare', from: 1, to: 1},
  {value: 'rare', from: 2, to: 4},
  {value: 'original', from: 5, to: editionSize},
]

// get the name without last 4 characters -> slice .png from the name
const cleanName = _str => {
  let name = _str.slice(0, -4)
  return name
}

// reads the filenames of a given folder and returns it with its name and path
const getElements = path =>
  fs
    .readdirSync(path)
    .filter(item => !/(^|\/)\.[^\/\.]/g.test(item))
    .map(i => ({
      name: cleanName(i),
      path: `${path}/${i}`,
    }))

const layers = [
  // {
  //   elements: {
  //     original: getElements(`${dir}/background/original`),
  //     rare: getElements(`${dir}/background/rare`),
  //     super_rare: getElements(`${dir}/background/super_rare`),
  //   },
  //   position: {x: 0, y: 0},
  //   size: {width, height},
  // },
  {
    elements: {
      original: getElements(`${dir}/ball/original`),
      rare: getElements(`${dir}/ball/rare`),
      super_rare: getElements(`${dir}/ball/super_rare`),
    },
    position: {x: 0, y: 0},
    size: {width, height},
  },
  {
    elements: {
      original: getElements(`${dir}/eye color/original`),
      rare: getElements(`${dir}/eye color/rare`),
      super_rare: getElements(`${dir}/eye color/super_rare`),
    },
    position: {x: 0, y: 0},
    size: {width, height},
  },
  {
    elements: {
      original: getElements(`${dir}/iris/original`),
      rare: getElements(`${dir}/iris/rare`),
      super_rare: getElements(`${dir}/iris/super_rare`),
    },
    position: {x: 0, y: 0},
    size: {width, height},
  },
  {
    elements: {
      original: getElements(`${dir}/shine/original`),
      rare: getElements(`${dir}/shine/rare`),
      super_rare: getElements(`${dir}/shine/super_rare`),
    },
    position: {x: 0, y: 0},
    size: {width, height},
  },
  {
    elements: {
      original: getElements(`${dir}/bottom lid/original`),
      rare: getElements(`${dir}/bottom lid/rare`),
      super_rare: getElements(`${dir}/bottom lid/super_rare`),
    },
    position: {x: 0, y: 0},
    size: {width, height},
  },
  {
    elements: {
      original: getElements(`${dir}/top lid/original`),
      rare: getElements(`${dir}/top lid/rare`),
      super_rare: getElements(`${dir}/top lid/super_rare`),
    },
    position: {x: 0, y: 0},
    size: {width, height},
  },
]

module.exports = {
  layers,
  width,
  height,
  description,
  baseImageURI,
  startEditionFrom,
  endEditionAt,
  editionSize,
  rarityWeight,
}
