import React, { useEffect } from "react";
import * as d3 from "d3";

const students = [
  { name: "Patrick", score: 80 },
  { name: "Patrick2", score: 30 },
  { name: "Patrick3", score: 40 },
  { name: "Patrick4", score: 10 },
  { name: "Patrick5", score: 70 },
]

const sizes = {
  width: 900,
  height: 450,
}

const margin = {
  top: 50,
  bottom: 50,
  left: 50,
  right: 50,
}

const x = d3.scaleBand()
  .domain(d3.range(students.length))
  .range([margin.left, sizes.width - margin.right ])
  .padding(0.1)

const y = d3.scaleLinear()
  .domain([0, d3.max(students, (d) => d.score )])
  .range([sizes.height - margin.bottom, margin.top])


const yAxis = (g) => {
  g.attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks())
    .attr("font-size", "20px")
}

const xAxis = (g) => {
  g.attr("transform", `translate(0,${sizes.height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat((i) => students[i].name))
    .attr("font-size", "20px")
}

function handleMouseOver(e, barValue) {
  console.log("mouse over", e, barValue)
  const bar = d3.select(this)
    .attr("fill", "orange");

  // // Specify where to put label of text
  // const svg = d3.select("#svg")
  // svg.append("text")
  // .attr("id", "bar-" + barValue.name)
  // .attr("x", function() { return xAxis(e.x) - 30; })
  // .attr("y", function() { return yAxis(e.y) - 15; })
  //  .text(function() {
  //    return [e.x, e.y];  // Value of the text
  //  });
}

function handleMouseOut(e, barValue) {
  console.log("mouse out", e, barValue)
  const el = e.target;
  const bar = d3.select(this)
    .attr("fill", "royalblue");
  
  // d3.select("bar-" + barValue.name).remove();  // Remove text location
}

export function BarChart(props) {
  const { data, selectedProvince } = props;

  console.log({ data, selectedProvince })

  useEffect(() => {
      const svg = d3.select("#svg")
      
      svg.append('g')
       .attr("fill", "royalblue")
       .selectAll("rect")
       .data(students.sort((a,b) => d3.descending(a.score, b.score)))
       .join("rect")
          .attr("class", "rect")
          .attr("x", (d, i) => x(i))
          .attr("y", (d) => y(d.score))
          .attr("title", (d) => d.score)
          .attr("height", (d) => y(0) - y(d.score))
          .attr("width", x.bandwidth())
          .on('mouseover', handleMouseOver)
          .on('mouseout', handleMouseOut)

      svg.append('g').call(xAxis)
      svg.append('g').call(yAxis)
      svg.node()
  })

  return (
    <div>
      <div className="chart info">
        <p>name: {"selected user"}</p>
        <p>score: {"selected score"}</p>
      </div>
      <svg
        id="svg"
        height={sizes.height - margin.top - margin.bottom}
        width={sizes.width - margin.left - margin.right} 
        viewBox={[0,0, sizes.width, sizes.height]}
      ></svg>
    </div>
  );
}