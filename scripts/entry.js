// import { loadSparams } from './loadSparams'
import { loadSparams } from 'rf-network'
import { SmithChart } from './smith'

let smithChart = new SmithChart('#smith-container')
smithChart.update()

const fileInput = document.getElementById('fileInput')
fileInput.addEventListener('change', event => {
  loadSparams(event)
})
