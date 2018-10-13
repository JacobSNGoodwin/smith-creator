// dependencies
import * as d3 from 'd3'
import * as math from 'mathjs'


/*
* First we include functions for computing arcs on Smith chart for going between
* gamma and normalized load impedance
*/

function zLoadNormalizedToGamma(zLoadNormalized) {
  const numerator =  math.subtract(zLoadNormalized, 1)
  const denominator =  math.add(zLoadNormalized, 1)
  return math.divide(numerator, denominator)
}


function gammaToZLoadNormalized(gamma) {
  const numerator = math.add(1, gamma)
  const denominator = math.subtract(1, gamma)
  return math.divide(numerator, denominator)
}

/*
* Takes in the value of the constant resitance circle and the start and end point 
* of this arc. The start and end point will be a particular value of the normalized
* load reactance, xLoad
*
* Returns the values of the cirlce center and the start and end points of the arc and radius
* x represents real gamma, y represents imaginary gamma
* These numbers will feed into the d3.pth.arcTo path generator funtion
*/
function getRealArc(rL, xL1, xL2) {
  const zL1 = math.complex(rL, xL1) // normzlied impedance of arc start
                                              // Don't need to compute conjugate because of symmetry
  const zL2 = math.complex(rL, xL2)
  const gamma1 = zLoadNormalizedToGamma(zL1)
  const gamma2 = zLoadNormalizedToGamma(zL2)

  const radius = 1 / (1+ rL)
  const cx = rL / (1 + rL)
  const cy =  0


  // get angles from centers to gamma crossings
  let angle1 = math.subtract(gamma1, math.complex(cx, cy)).toPolar().phi
  let angle2 = math.subtract(gamma2, math.complex(cx, cy)).toPolar().phi

  // Keep angles positive for simplicity
  if (angle1 < 0) {
    angle1 = angle1 + 2 * Math.PI
  }
  if (angle2 < 0) {
    angle2 = angle2 + 2 * Math.PI
  }

  return {
    radius, cx, cy, angle1, angle2
  }
}

/*
* Similar to above, except for section of the imaginary impedance arc
*/
function getImagArc(xL, rL1, rL2) {
  const zL1 = math.complex(rL1, xL)
  const zL2 = math.complex(rL2, xL)

  const gamma1 = zLoadNormalizedToGamma(zL1)
  const gamma2 = zLoadNormalizedToGamma(zL2)

  const radius = Math.abs(1 / xL)
  const cx = 1
  const cy = 1 / xL

   // get angles from centers to gamma crossings
  let angle1 = math.subtract(gamma1, math.complex(cx, cy)).toPolar().phi
  let angle2 = math.subtract(gamma2, math.complex(cx, cy)).toPolar().phi
  // Keep angles positive for simplicity
  if (angle1 < 0) {
    angle1 = angle1 + 2 * Math.PI
  }
  if (angle2 < 0) {
    angle2 = angle2 + 2 * Math.PI
  }
  return {
    radius, cx, cy, angle1, angle2
  }
}


/*
* Creation of Smith Chart
* Function takes in an input parameter in spacing.
* The spacing defines the gamma points where constant z circles cross
*/

export class SmithChart {

  constructor(
    margin = 0.05,
    realLineValues = [0.2, 0.5, 1, 2, 5, 10],
    imagLineValues = [0.2, 0.5, 1, 2, 5, 10],
    realLineColor = 'green',
    imagLineColor = 'red',

  ) {
    this._margin = margin;
    this._realLineValues = realLineValues,
    this._imagLineValues = imagLineValues,
    this._realLineColor = realLineColor,
    this._imagLineColor = imagLineColor
  }

  setRealLineValues() {
    
  }

  setImagLineValues() {

  }

  setMargin() {

  }

  setRealLineColor(realLineColor) {
    this._realLineColor = realLineColor; 
  }

  setImagLineColor(imagLineColor) {
    this._imagLineColor = imagLineColor;
  }

  create() {
    // method to draw the initially created Smith Chart

    // set up container with the main svg and g for the chart
    let g = d3.select("#smith-container")
    .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + (1 + 2*this._margin) + " " + (1 + 2*this._margin))
    .append("g")
      .attr("transform", "translate(" + this._margin 
        + ", " + this._margin + ")")


    // scales for x (gamma_real), y (gamma_imag), radius, and angle
    const x = d3.scaleLinear()
      .domain([-1, 1])
      .range([0, 1])
    const y = d3.scaleLinear()
      .domain([-1, 1])
      .range([1, 0])
    const r = d3.scaleLinear()
      .domain([0, 1])
      .range([0, 0.5])

    // Angles go in reverse direction in svg, so we just reverse them   
    const a = d3.scaleLinear()
      .domain([0, 2 * Math.PI])
      .range([0, -2 * Math.PI])

    // select data from major lines array
    let realPaths = g.selectAll("path").data(this._realLineValues)
    let imagPaths = g.selectAll("path").data(this._imagLineValues)

    // real circles
    realPaths.enter()
      .append("path")
      .attr("d", (d) => {
        const arc = getRealArc(d, 1E6, -1E6)
        let realCircle = d3.path()
        realCircle.arc(x(arc.cx), y(arc.cy), r(arc.radius), a(arc.angle1), a(arc.angle2), true)
        return realCircle
      })
      .attr("stroke", this._realLineColor)
      .attr("stroke-width", 0.005)
      .attr("fill", "none")

    // postive imag circles
    imagPaths.enter()
      .append("path")
      .attr("d", (d) => {
        const arc = getImagArc(d, 0, 1E6)
        let imagCircle = d3.path()
        imagCircle.arc(x(arc.cx), y(arc.cy), r(arc.radius), a(arc.angle1), a(arc.angle2), true)
        return imagCircle
      })
      .attr("stroke", this._imagLineColor)
      .attr("stroke-width", 0.005)
      .attr("fill", "none")

      // negative imag circles
    imagPaths.enter()
      .append("path")
      .attr("d", (d) => {
        const arc = getImagArc(-d, 0, 1E6)
        let imagCircle = d3.path()
        imagCircle.arc(x(arc.cx), y(arc.cy), r(arc.radius), a(arc.angle1), a(arc.angle2))
        return imagCircle
      })
      .attr("stroke", this._imagLineColor)
      .attr("stroke-width", 0.005)
      .attr("fill", "none")

    // outer real circle
    let outerCirlce = d3.path()
    outerCirlce.arc(x(0), y(0), r(1), a(0), a(2 * Math.PI), true)
    g.append("path")
      .attr("d", outerCirlce)
      .attr("stroke", this._imagLineColor)
      .attr("stroke-width", 0.005)
      .attr("fill", "none")

    // imag = 0 line
    let imagLine = d3.path()
    imagLine.moveTo(x(-1), y(0))
    imagLine.lineTo(x(1), y(0))
    g.append("path")
      .attr("d", imagLine)
      .attr("stroke", this._imagLineColor)
      .attr("stroke-width", 0.005)
      .attr("fill", "none")

  }
  
}
