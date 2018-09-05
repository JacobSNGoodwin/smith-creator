import * as d3 from 'd3';
import * as math from 'mathjs';



const margin = 0.05; 

// create evenly devided arcs for real and imaginary smith lines
let step = 1;
const lineSpacing = math.range(-1,1, step, true);



// let g = d3.select("#smith-container")
//   .append("svg")
//     .attr("preserveAspectRatio", "xMinYMin meet")
//     .attr("viewBox", "0 0 " + (1 + 2*margin) + " " + (1 + 2*margin))
//   .append("g")
//     .attr("transform", "translate(" + margin 
//        + ", " + margin + ")");


// // scales for x (gamma_real), y (gamma_imag), radius, and angle
// const x = d3.scaleLinear()
//   .domain([-1, 1])
//   .range([0, 1]);
// const y = d3.scaleLinear()
//   .domain([-1, 1])
//   .range([1, 0]);
// const r = d3.scaleLinear()
//   .domain([0, 1])
//   .range([0, 0.5]);
// const a = d3.scaleLinear()
//   .domain([0, 2 * Math.PI])
//   .range([0, -2 * Math.PI]);



// // select data from major lines array
// let paths = g.selectAll("path").data(majorLines);

// // real circles
// paths.enter()
//   .append("path")
//   .attr("d", (d) => {
//     const arc = getRealArc(d, 1E6, -1E6);
//     let realCircle = d3.path();
//     realCircle.arc(x(arc.cx), y(arc.cy), r(arc.radius), a(arc.angle1), a(arc.angle2), true);
//     return realCircle;
//   })
//   .attr("stroke", "blue")
//   .attr("stroke-width", 0.005)
//   .attr("fill", "none")

// // postive imag circles
// paths.enter()
//   .append("path")
//   .attr("d", (d) => {
//     const arc = getImagArc(d, 0, 1E6);
//     let imagCircle = d3.path();
//     imagCircle.arc(x(arc.cx), y(arc.cy), r(arc.radius), a(arc.angle1), a(arc.angle2), true);
//     return imagCircle;
//   })
//   .attr("stroke", "red")
//   .attr("stroke-width", 0.005)
//   .attr("fill", "none");
// paths.enter()
//   .append("path")
//   .attr("d", (d) => {
//     const arc = getImagArc(-d, 0, 1E6);
//     let imagCircle = d3.path();
//     imagCircle.arc(x(arc.cx), y(arc.cy), r(arc.radius), a(arc.angle1), a(arc.angle2));
//     return imagCircle;
//   })
//   .attr("stroke", "red")
//   .attr("stroke-width", 0.005)
//   .attr("fill", "none");

// // outer circle
// let outerCirlce = d3.path();
// outerCirlce.arc(x(0), y(0), r(1), a(0), a(2 * Math.PI), true);
// g.append("path")
// .attr("d", outerCirlce)
// .attr("stroke", "blue")
// .attr("stroke-width", 0.005)
// .attr("fill", "none")

// // imag = 0 line
// let imagLine = d3.path();
// imagLine.moveTo(x(-1), y(0));
// imagLine.lineTo(x(1), y(0));
// g.append("path")
// .attr("d", imagLine)
// .attr("stroke", "red")
// .attr("stroke-width", 0.005)
// .attr("fill", "none")