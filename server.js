const http = require('http')

const server = http.createServer(function (req, res) {

    const url = 'http://google.pl'

    let body = '<p>Redirection to <a href="' + url + '">' + url + '</a></p>'
    res.setHeader('Location', url)
    res.setHeader('Content-Length', body.length)
    res.setHeader('Content-Type', 'text/html')

    res.statusCode = 302
    res.end(body)
})

server.listen(3000)