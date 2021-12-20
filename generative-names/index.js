const {names, middleNames, surnames} = require('./config')

const format = [names, middleNames, surnames]

const create = () => {
  let output = []
  format.forEach(list => {
    output.push(list[Math.floor(Math.random() * list.length)])
  })
  return output.join(' ')
}

console.table({name: create()})

// AnotherWay
const generateName = () => {
  const name = names[Math.floor(Math.random() * names.length)]
  const middleName = middleNames[Math.floor(Math.random() * middleNames.length)]
  const surname = surnames[Math.floor(Math.random() * surnames.length)]
  return `${name} ${middleName} ${surname}`
}

console.table({name: generateName()})
