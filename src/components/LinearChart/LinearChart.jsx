import React, { useEffect, useRef } from 'react'
import { makeLinearChart, mockdata } from '../../util/makeLinearChart'
import * as d3 from 'd3'
const { select } = d3
const random = () => Math.round(Math.random() * 100)

const data = [
  { name: `Тест ${random()}`, amount: random() },
  { name: `Тест ${random()}`, amount: random() },
  { name: `Тест ${random()}`, amount: random() },
  { name: `Тест ${random()}`, amount: random() },
  { name: `Тест ${random()}`, amount: random() },
]

// const max = dataset
//   .map(({ amount }) => amount)
//   .reduce((acc, i) => Math.max(acc, i), 0)

const LinearChart = () => {
  //refs
  const svgRef = useRef()

  console.log(mockdata)
  //draws chart
  useEffect(() => {
    const svg = select(svgRef.current)

    makeLinearChart(data, svg)
  }, [])

  return <svg ref={svgRef}></svg>
}

export default LinearChart
