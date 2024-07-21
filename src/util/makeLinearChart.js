import * as d3 from 'd3';
import { random, randomArray, randomSplit } from './random';
import { Histogram } from './Histogram';

// import { Histogram } from 'd3/histogram';

const { nest } = d3;

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
  const width = 900;
  const height = 400;
  const marginTop = 30;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 20;
  const paddingTop = 10;
  const paddingLeft = 50;

  svg
    .attr('viewBox', [0, 0, width, height])
    .attr('width', width + marginLeft + marginRight)
    .attr('height', height + marginTop + marginBottom)
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

  const maxValue = d3.max(dataset, (d) => d.value);

  // ось координат
  const x = d3
    .scaleTime()
    .domain([period.start, period.end])
    .range([0, width - paddingLeft]);
  const xAxis = d3
    .axisBottom(x)
    .tickValues(dataset.map((d) => d.date))
    .tickFormat((d) => d3.timeFormat('%d.%m')(d));

  // ось значений
  const y = d3
    .scaleLinear()
    .domain([maxValue, 0])
    .range([0, height - paddingTop]);

  //отрисовка x оси
  svg.append('g').call(xAxis).attr('transform', `translate(${paddingLeft},${height})`);

  // отрисовка y оси
  svg.append('g').attr('transform', `translate(${paddingLeft},${paddingTop})`).call(d3.axisLeft(y));

  console.log(maxValue);

  // dataset.forEach(({ date }) => {
  //   console.log(`x(${date}) - ${x(date)}`)
  // });
};

export const makeGrid = (svg) => {
  const width = 500;
  const height = 500;

  const marginTop = 20;
  const marginBottom = 20;
  const marginVertical = marginTop + marginBottom;

  const marginLeft = 20;
  const marginRight = 20;
  const marginHorizonatl = marginLeft + marginRight;

  const svgWidth = width + marginHorizonatl;
  const svgHeight = height + marginVertical;

  svg.attr('viewBox', [0, 0, svgWidth, svgHeight]).attr('width', svgWidth).attr('height', svgHeight);

  const x = d3.scaleLinear().domain([0, 100]).range([0, width]);
  const xAxis = d3.axisBottom(x).ticks(11);

  // ось значений
  const y = d3.scaleLinear().domain([100, 0]).range([0, height]);
  const yAxis = d3.axisLeft(y).ticks(11);

  //отрисовка x оси
  svg
    .append('g')
    .attr('class', 'x-axis')
    .call(xAxis)
    .attr('transform', `translate(${marginLeft},${height + marginTop})`);

  // отрисовка y оси
  svg.append('g').attr('class', 'y-axis').call(yAxis).attr('transform', `translate(${marginLeft},${marginTop})`);

  // создаем набор вертикальных линий для сетки
  svg
    .selectAll('g.x-axis g.tick')
    .append('line') // добавляем линию
    .classed('grid-line', true) // добавляем класс
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', -height)
    .attr('stroke', 'black')
    .style('stroke-opacity', 0.2);

  console.log(d3.selectAll('.grid-line'));

  // рисуем горизонтальные линии
  d3.selectAll('g.y-axis g.tick')
    .append('line')
    .classed('grid-line', true)
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', width)
    .attr('y2', 0)
    .attr('stroke', 'black')
    .style('stroke-opacity', 0.2);

  // dataset.forEach(({ date }) => {
  //   console.log(`x(${date}) - ${x(date)}`)
  // });
};

export const makeGridWithGraph = (svg) => {
  const width = 500;
  const height = 500;

  const marginTop = 20;
  const marginBottom = 20;
  const marginVertical = marginTop + marginBottom;

  const marginLeft = 20;
  const marginRight = 20;
  const marginHorizonatl = marginLeft + marginRight;

  const svgWidth = width + marginHorizonatl;
  const svgHeight = height + marginVertical;

  const rawData = [
    { x: 10, y: 67 },
    { x: 20, y: 74 },
    { x: 30, y: 63 },
    { x: 40, y: 56 },
    { x: 50, y: 24 },
    { x: 60, y: 26 },
    { x: 70, y: 19 },
    { x: 80, y: 42 },
    { x: 90, y: 88 },
  ];

  svg.attr('viewBox', [0, 0, svgWidth, svgHeight]).attr('width', svgWidth).attr('height', svgHeight);

  const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
  const xAxis = d3.axisBottom(xScale).ticks(11);

  // ось значений
  const yScale = d3.scaleLinear().domain([100, 0]).range([0, height]);
  const yAxis = d3.axisLeft(yScale).ticks(11);

  console.log('scale x', xScale(20));

  const data = rawData.map(({ x, y }) => ({ x: xScale(x), y: yScale(y) }));

  //отрисовка x оси
  svg
    .append('g')
    .attr('class', 'x-axis')
    .call(xAxis)
    .attr('transform', `translate(${marginLeft},${height + marginTop})`);

  // отрисовка y оси
  svg.append('g').attr('class', 'y-axis').call(yAxis).attr('transform', `translate(${marginLeft},${marginTop})`);

  // создаем набор вертикальных линий для сетки
  svg
    .selectAll('g.x-axis g.tick')
    .append('line') // добавляем линию
    .classed('grid-line', true) // добавляем класс
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', -height)
    .attr('stroke', 'black')
    .style('stroke-opacity', 0.2);

  console.log(d3.selectAll('.grid-line'));

  // рисуем горизонтальные линии
  d3.selectAll('g.y-axis g.tick')
    .append('line')
    .classed('grid-line', true)
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', width)
    .attr('y2', 0)
    .attr('stroke', 'black')
    .style('stroke-opacity', 0.2);

  const line = d3
    .line()
    .x((d) => {
      return d.x + marginLeft;
    })
    .y((d) => {
      return d.y + marginTop;
    });
  // добавляем путь

  console.log(data);
  svg
    .append('g')
    .append('path')
    .attr('d', line(data))
    .style('stroke', 'steelblue')
    .style('stroke-width', 2)
    .style('fill', 'none');

  svg
    .append('g')
    .selectAll('.dot')
    .data(rawData)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('r', 3.5)
    .attr('cx', (d) => {
      return xScale(d.x) + marginLeft;
    })
    .attr('cy', (d) => {
      return yScale(d.y) + marginTop;
    });

  // dataset.forEach(({ date }) => {
  //   console.log(`x(${date}) - ${x(date)}`)
  // });
};

const prevDay = (date) => date.setDate(date.getDate() - 1)
const nextDay = (date) => date.setDate(date.getDate() + 1)

export const makeStackedBarChart = (svg) => {
  const width = 500;
  const height = 500;

  const marginTop = 20;
  const marginBottom = 20;
  const marginVertical = marginTop + marginBottom;

  const marginLeft = 50;
  const marginRight = 20;
  const marginHorizonatl = marginLeft + marginRight;

  const svgWidth = width + marginHorizonatl;
  const svgHeight = height + marginVertical;

  const data = [
    { date: new Date('2015-01-01'), category: 'apples', value: 3840 },
    { date: new Date('2015-01-01'), category: 'bananas', value: 1920 },
    { date: new Date('2015-01-01'), category: 'cherries', value: 960 },
    { date: new Date('2015-01-01'), category: 'durians', value: 400 },
    { date: new Date('2015-01-02'), category: 'apples', value: 1600 },
    { date: new Date('2015-01-02'), category: 'bananas', value: 1440 },
    { date: new Date('2015-01-02'), category: 'cherries', value: 960 },
    { date: new Date('2015-01-02'), category: 'durians', value: 400 },
    { date: new Date('2015-01-03'), category: 'apples', value: 640 },
    { date: new Date('2015-01-03'), category: 'bananas', value: 960 },
    { date: new Date('2015-01-03'), category: 'cherries', value: 640 },
    { date: new Date('2015-01-03'), category: 'durians', value: 400 },
    { date: new Date('2015-01-04'), category: 'apples', value: 320 },
    { date: new Date('2015-01-04'), category: 'bananas', value: 480 },
    { date: new Date('2015-01-04'), category: 'cherries', value: 640 },
    { date: new Date('2015-01-04'), category: 'durians', value: 400 },
  ];

  const maxValue = d3.rollups(data,(item) => item.reduce((acc, { value }) => acc + value, 0), ({ date }) => date).reduce((max, [, value]) => Math.max(max, value), 0)
  const ticks = d3.groups(data, ({ date }) => date).length

  svg.attr('viewBox', [0, 0, svgWidth, svgHeight]).attr('width', svgWidth).attr('height', svgHeight);

  // const xOffesetLeft = 20;
  // const xOffesetRight = 20;
  // const xScale = d3.scaleLinear().domain([0 - xOffesetLeft, 100 + xOffesetRight]).range([0, width]);

  const startDate = new Date('2015-01-01')
  const endDate = new Date('2015-01-04')
  const days = d3.groups(data, ({ date }) => date).map(([date]) => date)

  const xScale = d3.scaleUtc().domain([prevDay(startDate), nextDay(endDate)]).range([0, width])
  const xAxis = d3.axisBottom(xScale).ticks(ticks).tickFormat(d3.timeFormat('%d.%m')).tickValues(days);

  const yScale = d3.scaleLinear().domain([maxValue, 0]).range([0, height]);
  const yAxis = d3.axisLeft(yScale).ticks(11);

  const categories = d3.union(data.map((row) => row.category));

  const mockColors = {
    apples: 'red',
    bananas: 'yellow',
    cherries: 'pink',
    durians: 'green',
  };
  const color = (category) => mockColors[category];

  const stackedData = d3
    .stack()
    .keys(categories)
    .value(([, group], key) => group.get(key).value)(
    d3.index(
      data,
      (d) => d.date,
      (d) => d.category
    )
  );

  const bandWidth = 25;

  //отрисовка x оси
  svg
    .append('g')
    .attr('class', 'x-axis')
    .call(xAxis)
    .attr('transform', `translate(${marginLeft},${height + marginTop})`);

  // отрисовка y оси
  svg.append('g').attr('class', 'y-axis').call(yAxis).attr('transform', `translate(${marginLeft},${marginTop})`);

  svg
    .append('g')
    .selectAll('g')
    .data(stackedData)
    .join('g')
    .attr('fill', (d) => color(d.key))
    .selectAll('rect')
    .data((D) => D)
    .join('rect')
    .attr('x', (d) => xScale(d.data[0]) + marginLeft - bandWidth / 2)
    .attr('y', (d) => yScale(d[1]) + marginTop)
    .attr('height', (d) => yScale(d[0]) - yScale(d[1]))
    .attr('width', bandWidth);
};
