const http = require('http')
const parse = require('url').parse
const join = require('path').join
const fs = require('fs')
const root = __dirname

const server = http.createServer((req, res) => {
    const url = parse(req.url)
    const path = join(root, url.pathname)

    fs.stat(path, (err, stat) => {
        if (err) {
            if ('ENOENT' == err.code) {
                res.statusCode = 404
                res.end('Not found')
            } else {
                res.statusCode = 500
                res.end('Internal server error')
            }
        } else {
            const stream = fs.createReadStream(path)

            stream.pipe(res)

            stream.on('error', (err) => {
                res.statusCode = 500
                res.end('Internal server error')
            })
        }
    })
})

server.listen(3000)