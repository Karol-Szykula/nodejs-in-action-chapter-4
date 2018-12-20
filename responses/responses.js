module.exports = {

    show: (res) => {
        const html = '<html><head><title>Lista rzeczy do zrobienia</title></head><body>'
            + '<h1>Lista rzeczy do zrobienia</h1>'
            + '<ul>'
            + items.map(function (item) {
                return '<li>' + item + '</li>'
            }).join('')
            + '</ul>'
            + '<form method="post" action="/">'
            + '<p><input type="text" name="item" /></p>'
            + '<p><input type="submit" value="Dodaj element" /></p>'
            + '</form></body></html>'

        res.setHeader('Content-Type', 'text/html')
        res.setHeader('Content-Length', Buffer.byteLength(html))
        res.end(html)

    },

    notFound: (res) => {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('Object has been not found')
    },

    badRequest: (res) => {
        res.statusCode = 400
        res.setHeader('Content-Type', 'text/plain')
        res.end('Incorrect request')
    },

    

}
