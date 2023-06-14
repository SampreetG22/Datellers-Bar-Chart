const data = [
  { name: 'Anand', marks: 99 },
  { name: 'Bhargav', marks: 85 },
  { name: 'Chaitanya', marks: 60 },
  { name: 'Damodar', marks: 40 },
  { name: 'Eshwar', marks: 20 },
  { name: 'Fatima', marks: 15 },
  { name: 'Ganesh', marks: 4 },
];

const width = 1000;
const height = 600;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

const svg = d3.select('#mainContainer')
  .append('svg')
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .padding(0.1)

const y = d3.scaleLinear()
  .domain([0, 100])
  .range([height - margin.bottom, margin.top])

svg
  .append("g")
  .attr("fill", '#722cf5')
  .selectAll("rect")
  .data(data.sort((a, b) => d3.descending(a.marks, b.marks)))
  .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.marks))
    .attr('title', (d) => d.marks)
    .attr("class", "rect")
    .attr("height", d => y(0) - y(d.marks))
    .attr("width", x.bandwidth());

//X-AXIS
svg.append("g")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(d3.axisLeft(y).ticks(null, data.format))
  .attr("font-size", '18px')
  .attr("font-weight","bold")

//Y-AXIS
svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x).tickFormat(i => data[i].name))
  .attr("font-size", '18px')
  .attr("font-weight","bold");

svg.node();