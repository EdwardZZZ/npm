var http = require('http')
var url = require('url')
var querystring = require('querystring')

function httpConnection(u) {
    var _url = u ? url.parse(u) : {},
        sendData,
        options = {
            hostname: _url.hostname,
            port: _url.port || 80,
            path: _url.path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
            }
        }

    var getContent = function (cb) {
        var req = http.request(options, function (res) {
            if (res.statusCode === 302) {
                getContent(res.headers.location, cb)
                return
            }
            res.setEncoding('utf8')
            var data = ''
            res.on('data', function (chunk) {
                data += chunk
            })
            res.on('end', function () {
                cb && cb(data)
            })
        })

        req.on('error', function (e) {
            console.log('problem with request:', e.message)
        })

        if (sendData && options.method.toLowerCase() === 'post') {
            req.write(sendData)
        }

        req.end()
    }

    return {
        method: function (_method) {
            options.method = _method
            return this
        },
        port: function (_port) {
            options.port = _port
            return this
        },
        headers: function (_headers) {
            Object.keys(_headers).forEach(function (_key) {
                options.headers[_key] = _headers[_key]
            })
            return this
        },
        data: function (_data) {
            sendData = querystring.stringify(_data)
            return this
        },
        config: function (_config) {
            options = _config
            return this
        },
        getData: function (cb) {
            cb && cb(sendData)
            return this
        },
        getConfig: function (cb) {
            cb && cb(options)
            return this
        },
        getContent: getContent
    }
}

module.exports = httpConnection