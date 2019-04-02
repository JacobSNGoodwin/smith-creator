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
      let sParamData = []
      let text = reader.result
      const splitText = text.split('\n')
      for (let line of splitText) {
        if (line[0] === '#') {
          const options = line.split(/ +/)
          sparams.freqUnit = options[1]
          sparams.parameter = options[2]
          sparams.format = options[3]
          sparams.resistance = options[5]
        } else if (line[0] !== '!' && line) {
          sParamData.push(line)
        }
      }
      console.log(sParamData)
      resolve(sparams)
    }
    reader.onerror = error => {
      reader.abort()
      reject('Failed to load file', error)
    }
  })
}

export default loadSparams
