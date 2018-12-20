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

    stream.on('error', (err) => {
        res.statusCode = 500
        res.end('Internal server error')
    })

})

server.listen(3000)