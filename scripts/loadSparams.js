const loadSparams = file => {
  // get file type and number of ports to verify proper data formate
  const fileType = file.name.split('.').pop()
  const nPorts = +fileType.match(/\d+/g)[0]

  // setup file reader
  const reader = new FileReader()
  reader.readAsText(file)

  return new Promise((resolve, reject) => {
    const sparams = {
      freq: null,
      parameter: null,
      format: null,
      resistance: null,
      data: []
    }

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
          sparams.data.push(line.split(/ +/))
        }
      })
      resolve(sparams)
    }
    reader.onerror = error => {
      reader.abort()
      reject('Failed to load file', error)
    }
  })
}

export default loadSparams
