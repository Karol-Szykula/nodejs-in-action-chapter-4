const http = require('http')
const url = require('url')

const items = []

const server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST':
            let item = ''
            req.setEncoding('utf8')

            req.on('data', function (chunk) {
                item += chunk
            })

            req.on('end', function () {
                items.push(item)
                res.end()
            })
            break
        case 'GET':
            const body = items.map((item, i) => {
                return i + ')' + item
            }).join('\n')
            res.setHeader('Content-Length', Buffer.byteLength(body))
            res.setHeader('Content-Type', 'text/plain; charset="utf-8"')
            res.end()
            break

        default:
            return
    }

})

server.listen(3000)