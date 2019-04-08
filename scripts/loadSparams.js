const loadSparams = file => {
  // get file type and number of ports to verify proper data formate
  const fileType = file.name.split('.').pop()
  const nPorts = +fileType.match(/\d+/g)[0]

  // setup file reader
  const reader = new FileReader()
  reader.readAsText(file)

  return new Promise((resolve, reject) => {
    reader.onload = () => {
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
      const data = parseData(textArray.slice(dataIndex), { nPorts, ...options })

      console.log(data)

      const sParams = {
        nPorts,
        ...options,
        data
      }

      resolve(sParams)
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
    .split(/\s+/)

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

const parseData = (dataLines, options) => {
  let data = []

  if (options.nPorts === 2) {
    // this is, unfortunately, the only case handled differently than the others
    // prefer to do one check at the top, even though code is somewhat repetitive
    for (let line of dataLines) {
      const lineElements = line.trim().split(/\s+/)
      const freq = lineElements.shift()
      const sParams = [
        [
          { a: lineElements[0], b: lineElements[1] },
          { a: lineElements[4], b: lineElements[5] }
        ],
        [
          { a: lineElements[2], b: lineElements[3] },
          { a: lineElements[6], b: lineElements[7] }
        ]
      ]
      data.push({ freq, sParams })
    }
    return data
  }
}

export { loadSparams }
