import * as d3 from 'd3';
import { random, randomArray, randomSplit } from './random';
import { Histogram } from './Histogram';

// import { Histogram } from 'd3/histogram';

const { nest } = d3
 
const makeData = (day) => {
  const colors = ['red', 'green', 'blue', 'orange', 'yellow'];
  const getRandomColor = randomArray(colors);
  const value = random(50);
  const colorsCount = random(colors.length, 1);
  const randomPercent = randomSplit(colorsCount);

  return {
    date: new Date(`2024-05-${day}`),
    value,
    colors: Array.from({ length: colorsCount })
      .fill({})
      .map(() => {
        const color = getRandomColor();

        return {
          color,
          percent: randomPercent(),
          name: color,
        };
      }),
  };
};

export const mockdata = Array.from({ length: 31 })
  .fill({})
  .map((_, index) => makeData(index + 1));

export const makeLinearChart = (svg, dataset, period) => {
  const width = 900
  const height = 400
  const marginTop = 30
  const marginRight = 20
  const marginBottom = 30
  const marginLeft = 20
  const paddingTop = 10
  const paddingLeft = 50

  svg
    .attr('viewBox', [0, 0, width, height])
    .attr('width', width + marginLeft + marginRight)
    .attr('height', height + marginTop + marginBottom)
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')')

  const maxValue = d3.max(dataset, (d) => d.value)

  // ось координат
  const x = d3.scaleTime().domain([period.start, period.end]).range([0, width - paddingLeft])
  const xAxis = d3.axisBottom(x).tickValues(dataset.map((d) => d.date)).tickFormat((d) => d3.timeFormat('%d.%m')(d))

  // ось значений
  const y = d3.scaleLinear().domain([maxValue, 0]).range([0, height - paddingTop])

  //отрисовка x оси
  svg
    .append('g')
    .call(xAxis)
    .attr('transform', `translate(${paddingLeft},${height})`)

  // отрисовка y оси
  svg
    .append('g')
    .attr('transform', `translate(${paddingLeft},${paddingTop})`)
    .call(d3.axisLeft(y))

  console.log(maxValue)

  // dataset.forEach(({ date }) => {
  //   console.log(`x(${date}) - ${x(date)}`)
  // });
}
