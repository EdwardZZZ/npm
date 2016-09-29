'use strict';
var Ajax = {
    get(url, params) {
        return this._ajax('GET', url, params)
    },
    post(url, params) {
        return this._ajax('POST', url, params)
    },
    _ajax: function(method, url, args) {
        return new Promise(function(resolve, reject) {
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
            client.open(method, postFlag ? url: uri);
            postFlag && client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            client.send(postFlag ? params: null);
            client.onload = function() {
                if (this.status >= 200 && this.status < 300) {
                    resolve(this.response);
                } else {
                    reject(this.statusText);
                }
            };
            client.onerror = function() {
                reject(this.statusText);
            };
        });
    }
}
module.exports = Ajax;