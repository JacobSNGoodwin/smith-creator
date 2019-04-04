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

      let optionsIndex = null
      let dataIndex = null // line where data starts
      for (let i = 0; i < textArray.length; i++) {
        if (textArray[i][0] === '#') {
          optionsIndex = i
        }
        if (
          optionsIndex && // we've already found options
          textArray[i] && // the line has text
          i > optionsIndex && // we're past the options index
          textArray[i][0] !== '!' // it's not a comment line (can be comment after options, eww)
        ) {
          // start of data which needs to be handled different for different
          // values of nPort
          dataIndex = i
          break
        }
      }

      // parse options into desired format
      const options = parseOptions(textArray[optionsIndex])

      console.log(options)

      resolve(sparams)
    }
    reader.onerror = error => {
      reader.abort()
      reject('Failed to load file', error)
    }
  })
}

// parseOptions takes the options string from the touchstone file
// returns an object with the options parameters
const parseOptions = optionsString => {
  // set defaults based on spec
  const options = {
    freqUnit: 'GHz',
    paramType: 'S',
    format: 'MA',
    Z0: 50
  }

  const optionsArray = optionsString
    .trim()
    .toUpperCase()
    .split(/ +/)

  while (optionsArray.length > 0) {
    // shift elements out of array as they're found
    const option = optionsArray[0]
    if (option === '#') {
      optionsArray.shift()
    } else if (
      option === 'GHZ' ||
      option === 'MHZ' ||
      option === 'KHZ' ||
      option === 'HZ'
    ) {
      options.freqUnit = optionsArray.shift()
    } else if (
      option === 'S' ||
      option === 'Y' ||
      option === 'Z' ||
      option === 'H' ||
      option === 'G'
    ) {
      options.paramType = optionsArray.shift()
    } else if (option === 'DB' || option === 'MA' || option === 'RI') {
      options.format = optionsArray.shift()
    } else if (option === 'R') {
      optionsArray.shift()
      options.Z0 = +optionsArray.shift()
    } else {
      optionsArray.shift()
    }
  }
  return options
}

export default loadSparams
