const { PerformanceObserver, performance } = require('node:perf_hooks')

const measure = (label, cb) => {
  console.time(label)
  const res = cb()
  console.timeEnd(label)
  return res
}

const measureSeries = (label, min, max, executeCb, logCb) => {
  let executions = []
  const perfObserver = new PerformanceObserver((list) => {
    const entry = list.getEntries()[0]
    executions.push(entry)
  })
  
  perfObserver.observe({ entryTypes: ["measure"], buffer: false })

  const results = []
  performance.mark('start')
  for (let i = 10 ** min; i <= 10 ** max; i *= 10) {
    const markItemStart = `item_start_${i}`
    const markItemEnd = `item_end_${i}`

    performance.mark(markItemStart)
    const res = executeCb(i)
    performance.mark(markItemEnd)

    performance.measure(`${label} ${i}`, markItemStart, markItemEnd)
    results.push(res)
  }
  if (logCb) {
    results.forEach((res, index) => {
      const execution = executions?.[index]
      logCb(execution?.name, execution?.duration, res)
    })
  }
  return {
    results,
    executions
  }
}

module.exports = {
  measure,
  measureSeries
}