const http = require('http')
const parse = require('url').parse
const join = require('path').join
const fs = require('fs')
const root = __dirname

const server = http.createServer((req, res) => {
    const url = parse(req.url)
    const path = join(root, url.pathname)
    const stream = fs.createReadStream(path)

    stream.pipe(res)

})

server.listen(3000)