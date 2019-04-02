const fileChange = targetElement => {
  return new Promise((resolve, reject) => {
    const fileInput = document.getElementById(targetElement)
    let fileType = null
    fileInput.addEventListener('change', event => {
      const file = event.target.files[0]
      fileType = file.name.split('.').pop()
      reader.readAsText(file)
    })

    const sparams = {
      freq: null,
      parameter: null,
      format: null,
      resistance: null,
      data: []
    }
    const reader = new FileReader()
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
      reject('Failed to load file', error)
    }
  })
}

export default fileChange
