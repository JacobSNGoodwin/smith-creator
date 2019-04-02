import * as d3 from 'd3'
import { SmithChart } from './smith'

let smithChart = new SmithChart('#smith-container')

const fileInput = document.getElementById('fileInput')

fileInput.addEventListener('change', event => {
  const file = event.target.files[0]
  reader.readAsText(file)
})

const sparams = {}
const reader = new FileReader()
reader.onload = () => {
  let text = reader.result
  const splitText = text.split('\n')
  splitText.forEach(line => {
    if (line[0] === '#') {
      const options = line.split(/ +/)
      sparams.freq = options[1]
      sparams.parameter = options[2]
      sparams.format = options[3]
      sparams.resistance = options[5]
    } else if (line[0] !== '!' && line) {
      // not a comment or empty line - set data
      const data = line.split(/ +/)
      console.log(data)
    }
  })
}
