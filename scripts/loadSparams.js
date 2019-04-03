const loadSparams = file => {
  // get file type and number of ports to verify proper data formate
  const fileType = file.name.split('.').pop()
  const nPorts = +fileType.match(/\d+/g)[0]

  // setup file reader
  const reader = new FileReader()
  reader.readAsText(file)

  return new Promise((resolve, reject) => {
    const sparams = {}

    reader.onload = () => {
      let sParamData = []
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

      const dataArray = textArray
        .slice(dataIndex)
        .join(' ')
        .split(/\s+/)

      for (let i = 0; i < dataArray.length; i += 1 + 2 * nPorts) {
        const dataAtFreq = dataArray.slice(i, i + 1 + 2 * nPorts)
        if (dataAtFreq.length !== i + 1 + 2 * nPorts) {
          break
        }
        const freqPoint = dataAtFreq[0]
        for (let j = 1; j < dataAtFreq.length; j++) {}
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
