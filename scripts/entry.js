import * as d3 from 'd3'
import { SmithChart } from './smith'

let smithChart = new SmithChart()

// smithChart.createContainer();
// smithChart.setMargin(.25)

smithChart.update()

// setTimeout(() => {
//   smithChart.setRealLineValues([0.1, 0.2, 0.5, 0.75, 1, 2, 5, 10])
//   smithChart.setImagLineValues([0.1, 0.2, 0.3, 0.4, 0.5, 0.75, 1, 2, 5, 10])
//   smithChart.setRealLineColor('orange')
//   smithChart.setImagLineColor('purple')
//   smithChart.setMargin(0.05)
//   smithChart.update()

//   setTimeout(() => {
//     smithChart.setRealLineValues([0.1, 0.5, 1, 10])
//     smithChart.setImagLineValues([0.1, 0.5, 1, 10])
//     smithChart.update()
//   }, 2000)
// }, 2000)

// smithChart.setRealLineValues([0.1, 0.2, 0.5, 0.75, 1, 2, 5, 10]);
// smithChart.update();

const fileInput = document.getElementById('fileInput')

fileInput.addEventListener('change', event => {
  const file = event.target.files[0]
  reader.readAsText(file)
})

const reader = new FileReader()
reader.onload = function(e) {
  let text = reader.result
  console.log(text)
}
