const fs = require('fs')

const width = 1000
const height = 1000
const dir = __dirname
const rarity = [
  {key: '', val: 'original'},
  {key: '_r', val: 'rare'},
  {key: '_sr', val: 'super rare'},
]

const addRarity = _str => {
  let itemRarity

  rarity.forEach(r => {
    if (_str.includes(r.key)) {
      itemRarity = r.val
    }
  })

  return itemRarity
}

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
    .map((i, index) => ({
      id: index + 1,
      name: cleanName(i),
      fileName: i,
      rarity: addRarity(i),
    }))

const layers = [
  {
    id: 1,
    name: 'background',
    location: `${dir}/background/`,
    elements: getElements(`${dir}/background/`),
    position: {x: 0, y: 0},
    size: {width, height},
  },
  {
    id: 2,
    name: 'ball',
    location: `${dir}/ball/`,
    elements: getElements(`${dir}/ball/`),
    position: {x: 0, y: 0},
    size: {width, height},
  },
  {
    id: 3,
    name: 'eye color',
    location: `${dir}/eye color/`,
    elements: getElements(`${dir}/eye color/`),
    position: {x: 0, y: 0},
    size: {width, height},
  },
  {
    id: 4,
    name: 'iris',
    location: `${dir}/iris/`,
    elements: getElements(`${dir}/iris/`),
    position: {x: 0, y: 0},
    size: {width, height},
  },
  {
    id: 5,
    name: 'shine',
    location: `${dir}/shine/`,
    elements: getElements(`${dir}/shine/`),
    position: {x: 0, y: 0},
    size: {width, height},
  },
  {
    id: 6,
    name: 'bottom lid',
    location: `${dir}/bottom lid/`,
    elements: getElements(`${dir}/bottom lid/`),
    position: {x: 0, y: 0},
    size: {width, height},
  },
  {
    id: 7,
    name: 'top lid',
    location: `${dir}/top lid/`,
    elements: getElements(`${dir}/top lid/`),
    position: {x: 0, y: 0},
    size: {width, height},
  },
]

module.exports = {
  layers,
  width,
  height,
}
