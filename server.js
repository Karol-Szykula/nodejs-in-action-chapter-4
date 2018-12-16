const http = require('http')

const server = http.createServer(function (req, res) {

    let body = 'Hello world'
    res.setHeader('Content-Length', body.length)
    res.setHeader('Content-Type', 'text/plain')
    res.end(body)
})

server.listen(3000)