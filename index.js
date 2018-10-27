const fs      = require('fs')
const request = require('request')
const yaml    = require('js-yaml')

let opts = {}
let filePath = process.argv[2]

if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
  opts = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
} else {
  let url, method = 'get'
  if (process.argv.length === 3) {
    url = process.argv[2]
  } else {
    method = process.argv[2].toLocaleLowerCase()
    url = process.argv[3]
  }

  // TODO: add headers support
  opts = {
    method,
    url,
  }
}

console.log('-------')
console.log('REQUEST')
console.log('-------')
console.log(opts)
console.log('===>')

console.time('curd time')
request(opts, function (err, response, body) {
  console.log('<===')
  if (err) {
    console.log('-----')
    console.log('ERROR')
    console.log('-----')
    console.log(err)
    return
  }

  console.log('--------')
  console.log('RESPONSE')
  console.log('----')
  console.log('Body')
  console.log('----')
  console.log(response.body)
  console.log('-------')
  console.log('Headers')
  console.log('-------')
  console.log(response.headers)
  console.log('-------')
  console.log('Status:', response.statusCode, response.statusMessage)
  console.log('-------')
  console.timeEnd('curd time')
})


