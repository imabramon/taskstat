import * as d3 from 'd3';
import { random, randomArray, randomSplit } from './random';

const makeData = (day) => {
  const colors = ['red', 'green', 'blue', 'orange', 'yellow'];
  const getRandomColor = randomArray(colors)
  const value = random(50)
  const colorsCount = random(colors.length, 1)
  const randomPercent = randomSplit(colorsCount)

  return {
    date: `${day}.05.2024`,
    value,
    colors: Array.from({ length: colorsCount }).fill({}).map(() => {
        const color = getRandomColor()

        return {
            color,
            percent: randomPercent(),
            name: color
        }
    }),
  };
};

export const mockdata = Array.from({ length: 31 })
  .fill({})
  .map((_, index) => makeData(index + 1));

export const makeLinearChart = (dataset, svg) => {
  console.log(dataset);
  const width = 640;
  const height = 400;
  const marginTop = 30;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 20;
  const paddingTop = 10;
  const paddingLeft = 50;

  dataset.sort((a, b) => b.amount - a.amount);

  svg
    .attr('viewBox', [0, 0, width, height])
    .attr('width', width + marginLeft + marginRight)
    .attr('height', height + marginTop + marginBottom)
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

  const x = d3
    .scaleLinear()
    .domain([0, Math.max(...dataset.map(({ amount }) => amount))])
    .range([0, width - paddingLeft]);
  const y = d3
    .scaleBand()
    .domain(dataset.map(({ name }) => name))
    .range([0, height - paddingTop]);

  svg.append('g').call(d3.axisTop(x)).attr('transform', `translate(${paddingLeft},${paddingTop})`);
  svg.append('g').attr('transform', `translate(${paddingLeft},${paddingTop})`).call(d3.axisLeft(y));

  svg
    .append('g')
    .attr('transform', `translate(${paddingLeft},${paddingTop})`)
    .attr('fill', 'steelblue')
    .selectAll()
    .data(dataset)
    .join('rect')
    .attr('x', () => x(0))
    .attr('y', (d) => y(d.name))
    .attr('width', (d) => x(d.amount) - x(0))
    .attr('height', y.bandwidth() / 2)
    .attr('transform', 'translate(' + 0 + ',' + y.bandwidth() / 4 + ')');
};
