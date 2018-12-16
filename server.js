const http = require('http')

const server = http.createServer(function (req, res) {
    res.write('Hello World')
    res.end()
})

server.listen(3000)