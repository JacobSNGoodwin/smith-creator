import * as d3 from 'd3'
import loadSparams from './loadSparams'
import { SmithChart } from './smith'

let smithChart = new SmithChart('#smith-container')
smithChart.update()

const fileInput = document.getElementById('fileInput')

fileInput.addEventListener('change', event => {
  const file = event.target.files[0]
  loadSparams(file).then(data => {
    console.log('Data loaded')
  })
})
