import React, { useEffect, useRef } from 'react'
import { makeLinearChart, mockdata } from '../../util/makeLinearChart'
import * as d3 from 'd3'
const { select } = d3
const random = () => Math.round(Math.random() * 100)

const LinearChart = () => {
  //refs
  const svgRef = useRef()

  console.log(mockdata)
  //draws chart
  useEffect(() => {
    const svg = select(svgRef.current)

    makeLinearChart(svg, mockdata, { start: new Date('2024-05-01'), end: new Date('2024-05-31') })
  }, [])

  return <svg ref={svgRef}></svg>

  // return (
  //   <>
  //   </>
  // )
}

export default LinearChart
