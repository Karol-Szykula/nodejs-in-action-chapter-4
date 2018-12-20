'use strict'
const http = require('http')
const url = require('url')
const responses = require('./responses/responses')
const qs = require('querystring')

const show = responses.show

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

const server = http.createServer(function (req, res) {
    if ('/' === req.url) {
        switch (req.method) {

            case 'POST':
                var item = ''
                req.setEncoding('utf8')

                req.on('data', function (chunk) {
                    item += chunk
                })

                req.on('end', function () {
                    items.push(item)
                    res.end()
                })
                break

            case 'PUT':
                var item = ''
                req.setEncoding('utf8')

                req.on('data', function (chunk) {
                    item += chunk
                })

                var path = url.parse(req.url).pathname
                var i = parseInt(path.slice(1), 10)

                if (isNaN(i)) {
                    res.statusCode = 400
                    res.end('Wrong identifier of an element')
                } else if (!items[i]) {
                    res.statusCode = 400
                    res.end('Element has not been found')
                } else {
                    req.on('end', function () {
                        var oldItem = items[i]
                        var newItem = oldItem.concat(item)

                        var rearOfOldArray = items.slice(i + 1, items.length)

                        var newItems = items.slice(0, i)
                        newItems.push(newItem)
                        newItems = newItems.concat(rearOfOldArray)

                        items = newItems
                        res.end('OK\n')
                    })
                }
                break

            case 'GET':
                const body = items.map(function (item, i) {
                    return i + ') ' + item
                }).join('\n')
                res.setHeader('Content-Length', Buffer.byteLength(body))
                res.setHeader('Content-Type', 'text/plain charset="utf-8"')
                res.end(body)
                break

            case 'DELETE':
                var path = url.parse(req.url).pathname
                var i = parseInt(path.slice(1), 10)

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
    } else {
        notFound(res)
    }

})

server.listen(3000)