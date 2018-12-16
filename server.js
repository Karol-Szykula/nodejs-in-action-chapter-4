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

        default:
            return
    }

})

server.listen(3000)