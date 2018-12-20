'use strict'
const http = require('http')
const url = require('url')
const responses = require('./responses/responses')
const qs = require('querystring')

const show = responses.show
const notFound = responses.notFound

let items = ['Buy a book', 'Read a book', 'Buy a milk']

function add(req, res) {
    let body = ''
    req.setEncoding('utf8')
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
        const obj = qs.parse(body)
        items.push(obj.item)
        show(res)
    })
}

var server = http.createServer(function (req, res) {
    if ('/' == req.url) {
        switch (req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req, res);
                break;
            default:
                badRequest(res);
        }
    } else {
        notFound(res);
    }
})

server.listen(3000)