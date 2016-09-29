'use strict';
var Ajax = {
    get: function (url, params) {
        return this._ajax('GET', url, params)
    },
    getJSON: function (url, params) {
        return this._ajax('GET', url, params, true)
    },
    post: function (url, params) {
        return this._ajax('POST', url, params)
    },
    postJSON: function (url, params) {
        return this._ajax('POST', url, params, true)
    },
    _ajax: function (method, url, args, json) {
        return new Promise(function (resolve, reject) {
            var client = new XMLHttpRequest();
            var uri = url,
                params = '',
                postFlag = (method === 'POST' || method === 'PUT');
            if (args) {
                uri += '?';
                var argcount = 0;
                for (var key in args) {
                    if (args.hasOwnProperty(key)) {
                        if (argcount++) {
                            params += '&';
                        }
                        params += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                    }
                }
                uri += params
            }
            client.open(method, postFlag ? url : uri);
            postFlag && client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            client.send(postFlag ? params : null);
            client.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    console.log(json)
                    resolve(json ? JSON.parse(this.response) : this.response);
                } else {
                    reject(this.statusText);
                }
            };
            client.onerror = function () {
                reject(this.statusText);
            };
        });
    }
}
module.exports = Ajax;