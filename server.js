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

        // case 'PUT':
        //     req.setEncoding('utf8')

        //     path = url.parse(req.url).pathname
        //     i = parseInt(path.slice(1), 10)

        //     req.on('data', function (chunk) {
        //         item += chunk
        //     })

        //     if (isNaN(i)) {
        //         res.statusCode = 400
        //         res.end('Wrong identifier of an element')
        //     } else if (!items[i]) {
        //         res.statusCode = 400
        //         res.end('Element has not been found')
        //     } else {
        //         items[i].join(item)
        //     }
        //     break

        case 'GET':
            const body = items.map(function (item, i) {
                return i + ') ' + item
            }).join('\n')
            res.setHeader('Content-Length', Buffer.byteLength(body))
            res.setHeader('Content-Type', 'text/plain charset="utf-8"')
            res.end(body)
            break

        case 'DELETE':
            let path = url.parse(req.url).pathname
            let i = parseInt(path.slice(1), 10)

            if (isNaN(i)) {
                res.statusCode = 400
                res.end('Wrong identifier of an element')
            } else if (!items[i]) {
                res.statusCode = 400
                res.end('Element has not been found')
            } else {
                items.splice(i, 1)
                res.end('OK\n')
            }
            break

        default:
            return
    }

})

server.listen(3000)