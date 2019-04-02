import * as d3 from 'd3'
import fileChange from './loadSparams'
import { SmithChart } from './smith'

let smithChart = new SmithChart('#smith-container')
smithChart.update()

fileChange('fileInput').then(sparams => {
  console.log(sparams)
})
