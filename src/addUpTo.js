#! /usr/bin/env node
const { measure, measureSeries } = require('./utils')

const addUpToByLoop = (n) => {
  let total = 0
  for (let i = 1; i <= n; i++) {
    total += i
  }
  return total
}

const addUpToByMath = (n) => {
  return (n + 1) * n / 2
}

const addUpToComparison = (n) => {
  const res1 = measure(`addUpToByLoop ${n}`, () => addUpToByLoop(n))
  const res2 = measure(`addUpToByMath ${n}`, () => addUpToByMath(n))
  console.info('res1', res1, 'res2', res2)
}

const run = () => {
  for (let i = 10e0; i <= 10e5; i *= 10) {
    addUpToComparison(i)
  }

  const logCb = (name, duration, res) => {
    console.info(`${name},\tduration: ${duration},\t\tres: ${res}`)
  }

  console.info('\nMeasuring addUpToByLoop')
  measureSeries('addUpToByLoop', 1, 5, addUpToByLoop, logCb)
  console.info('\nMeasuring addUpToByMath')
  measureSeries('addUpToByMath', 1, 5, addUpToByMath, logCb)
}

run()