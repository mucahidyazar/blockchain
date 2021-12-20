const fs = require('fs')

const width = 1000
const height = 1000
const dir = __dirname
const description = 'This is an NFT made by the coolest generative code.'
const baseImageURI = 'localhost:3000'
const startEditionFrom = 1
const endEditionAt = 12
const editionSize = 50

const raceWeight = [
  // {value: 'censored', from: 1, to: 2},
  // {value: 'particle', from: 3, to: 6},
  {value: 'alien', from: 1, to: editionSize},
  // {value: 'zombie', from: 13, to: 20},
  // {value: 'skull', from: 21, to: 33},
  // {value: 'human', from: 34, to: editionSize},
]

const races = {
  alien: {
    name: 'Alien',
    layers: [
      {
        name: 'Background',
        elements: [
          {
            id: 0,
            name: 'LightBlue',
            path: `${dir}/alien/1-background/LightBlue.png`,
            weight: 15,
          },
          {
            id: 1,
            name: 'Orange',
            path: `${dir}/alien/1-background/Orange.png`,
            weight: 85,
          },
        ],
        position: {x: 0, y: 0},
        size: {width, height},
      },
      {
        name: 'Suit',
        elements: [
          {
            id: 0,
            name: 'Orange',
            path: `${dir}/alien/2-suit/Orange.png`,
            weight: 10,
          },
          {
            id: 1,
            name: 'Regular',
            path: `${dir}/alien/2-suit/Regular.png`,
            weight: 90,
          },
        ],
        position: {x: 0, y: 0},
        size: {width, height},
      },
      {
        name: 'Shoulder',
        elements: [
          {
            id: 0,
            name: 'LunaFlag',
            path: `${dir}/alien/3-shoulder/LunaFlag.png`,
            weight: 10,
          },
          {
            id: 1,
            name: 'USA',
            path: `${dir}/alien/3-shoulder/USA.png`,
            weight: 90,
          },
        ],
        position: {x: 0, y: 0},
        size: {width, height},
      },
      {
        name: 'Pin',
        elements: [
          {
            id: 0,
            name: 'LunaBluePin',
            path: `${dir}/alien/4-pin/LunaBluePin.png`,
            weight: 10,
          },
          {
            id: 1,
            name: 'Smiley',
            path: `${dir}/alien/4-pin/Smiley.png`,
            weight: 90,
          },
        ],
        position: {x: 0, y: 0},
        size: {width, height},
      },
      {
        name: 'Skin',
        elements: [
          {
            id: 0,
            name: 'Skull',
            path: `${dir}/alien/5-skin/Skull.png`,
            weight: 100,
          },
        ],
        position: {x: 0, y: 0},
        size: {width, height},
      },
      {
        name: 'Facial Hair',
        elements: [
          {
            id: 0,
            name: 'NoFacialHair',
            path: `${dir}/alien/6-facial-hair/NoFacialHair.png`,
            weight: 100,
          },
        ],
        position: {x: 0, y: 0},
        size: {width, height},
      },
      {
        name: 'Mask',
        elements: [
          {
            id: 0,
            name: 'Mask',
            path: `${dir}/alien/7-mask/Mask.png`,
            weight: 10,
          },
          {
            id: 1,
            name: 'NoMask',
            path: `${dir}/alien/7-mask/NoMask.png`,
            weight: 90,
          },
        ],
        position: {x: 0, y: 0},
        size: {width, height},
      },
      {
        name: 'Hair',
        elements: [
          {
            id: 0,
            name: 'BlondeBun',
            path: `${dir}/alien/8-hair/BlondeBun.png`,
            weight: 10,
          },
          {
            id: 1,
            name: 'Pink',
            path: `${dir}/alien/8-hair/Pink.png`,
            weight: 90,
          },
        ],
        position: {x: 0, y: 0},
        size: {width, height},
      },
      {
        name: 'Accessories',
        elements: [
          {
            id: 0,
            name: 'NoAcc',
            path: `${dir}/alien/9-accessories/NoAcc.png`,
            weight: 10,
          },
        ],
        position: {x: 0, y: 0},
        size: {width, height},
      },
      {
        name: 'Headwear',
        elements: [
          {
            id: 0,
            name: 'GlassDome',
            path: `${dir}/alien/10-headwear/GlassDome.png`,
            weight: 10,
          },
          {
            id: 1,
            name: 'Headset',
            path: `${dir}/alien/10-headwear/Headset.png`,
            weight: 20,
          },
          {
            id: 2,
            name: 'Helmet',
            path: `${dir}/alien/10-headwear/Helmet.png`,
            weight: 10,
          },
          {
            id: 3,
            name: 'NFTHelmet',
            path: `${dir}/alien/10-headwear/NFTHelmet.png`,
            weight: 20,
          },
          {
            id: 4,
            name: 'NoHeadwear',
            path: `${dir}/alien/10-headwear/NoHeadwear.png`,
            weight: 10,
          },
          {
            id: 5,
            name: 'Robber',
            path: `${dir}/alien/10-headwear/Robber.png`,
            weight: 20,
          },
          {
            id: 6,
            name: 'Stealth',
            path: `${dir}/alien/10-headwear/Stealth.png`,
            weight: 10,
          },
        ],
        position: {x: 0, y: 0},
        size: {width, height},
      },
    ],
  },
}

module.exports = {
  races,
  raceWeight,
  width,
  height,
  description,
  baseImageURI,
  startEditionFrom,
  endEditionAt,
  editionSize,
}
