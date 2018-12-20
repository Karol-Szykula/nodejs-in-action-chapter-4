var http = require('http')
var formidable = require('formidable')
var fs = require('fs')

var options = {
    key: fs.readFileSync('/home/karol/prog/node-in-action/ssl/key.pem'),
    cert: fs.readFileSync('/home/karol/prog/node-in-action/ssl/key-cert.pem')
}

var server = http.createServer(options, (req, res) => {

    switch (req.method) {

        case 'GET':
            show(req, res)
            break

        case 'POST':
            upload(req, res)
            break
    }
})

const show = (req, res) => {
    var html = '<form method="post" action="/" enctype="multipart/form-data">'
        + '<p><input type="text" name="name" /><p>'
        + '<p><input type="file" name="file" /></p>'
        + '<p><input type="submit" value="Wyślij" /></p>'
        + '</form>'
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Content-Length', Buffer.byteLength(html))
    res.end(html)
}

const upload = (req, res) => {

    if ((!isFormData(req))) {
        res.statusCode = 400
        res.end('Wrong request: expected multipart type')
        return
    }
    var form = new formidable.IncomingForm()

    form.on('field', (field, value) => {
        console.log(field)
        console.log(value)
    })

    form.on('file', (name, file) => {
        console.log(name)
        console.log(file)
    })

    form.on('progress', (bytesReceived, bytesExpected) => {
        var percent = Math.floor(bytesReceived / bytesExpected * 100)
        console.log(percent)
    })

    form.on('end', () => {
        res.end('Ended sending files')
    })

    form.parse(req)
}

const isFormData = (req) => {
    var type = req.headers['content-type'] || ''
    return 0 == type.indexOf('multipart/form-data')
}

server.listen(3000)
