// import { loadSparams } from './loadSparams'
import Network from 'rf-network'
import { SmithChart } from './smith'

let smithChart = new SmithChart('#smith-container')
smithChart.update()

const fileInput = document.getElementById('fileInput')
fileInput.addEventListener('change', event => {
  const file = event.target.files[0]
  const reader = new FileReader()

  reader.onload = e => {
    const test = new Network(e.target.result)
    console.log(test.touchstoneText, test.refImpedance)
  }

  reader.onerror = e => {
    console.log('Error: ', e)
  }

  reader.readAsText(file)
})
