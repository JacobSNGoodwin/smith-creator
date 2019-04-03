const loadSparams = file => {
  // get file type and number of ports to verify proper data formate
  const fileType = file.name.split('.').pop()
  const nPorts = +fileType.match(/\d+/g)[0]

  // setup file reader
  const reader = new FileReader()
  reader.readAsText(file)

  return new Promise((resolve, reject) => {
    const sparams = {
      freqUnit: null,
      parameter: null,
      format: null,
      resistance: null,
      nPorts,
      data: null
    }

    reader.onload = () => {
      // let sParamData = []
      let textArray = reader.result.split('\n')

      let options = null
      let optionsIndex = null
      let dataIndex = null // line where data starts (could be comments betten)
      for (let i = 0; i < textArray.length; i++) {
        if (textArray[i][0] === '#') {
          optionsIndex = i
          options = textArray[i]
        }
        if (
          optionsIndex &&
          textArray[i] &&
          i > optionsIndex &&
          textArray[i][0] !== '!'
        ) {
          // start of data which needs to be handled different for different
          // values of nPort
          dataIndex = i
          break
        }
      }

      const linesPerFreq = nPorts > 2 ? nPorts : 1

      for (let i = dataIndex; i < textArray.length; i += linesPerFreq) {
        console.log()
      }

      resolve(sparams)
    }
    reader.onerror = error => {
      reader.abort()
      reject('Failed to load file', error)
    }
  })
}

export default loadSparams
