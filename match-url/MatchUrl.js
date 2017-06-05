var matchType = {
    braces: /{([^{}]+)}/g,
    colon: /:(([^\/\(\)]+)(\(([^\/]+)\))?)/g
}

var MatchUrl = {
    byBraces: function (url, reg) {
        return this.match(url, reg, 'braces')
    },
    byColon: function (url, reg) {
        return this.match(url, reg, 'colon')
    },
    getRegAndKeys: function (reg, type) {
        var paramKeys = [],
            type = type || 'braces',
            paramReg = reg.replace(matchType[type], function () {
                if (type === 'braces') {
                    var arr = arguments[1].split(':')
                    if (arguments[1].indexOf(':') > -1) {
                        var _paramKey = { key: arr[0] }
                        if(arr[1].indexOf('d') > -1){
                            _paramKey.type = 'int' 
                        }
                        paramKeys[paramKeys.length] = _paramKey
                        return '(' + arr[1] + ')'
                    }
                }
                if (type === 'colon') {
                    var _type = arguments[4]
                    if(_type !== void 0){
                        var _paramKey = { key: arguments[2] }
                        if(_type.indexOf('d') > -1){
                            _paramKey.type = 'int' 
                        }
                        paramKeys[paramKeys.length] = _paramKey
                        return '(' + _type + ')'
                    }
                }
                paramKeys[paramKeys.length] = { key: arguments[1] }
                return '([^\/]+)'
            })
        if (paramKeys.length === 0) return
        return {
            paramReg: paramReg,
            paramKeys: paramKeys
        }
    },
    matchResult: function (url, paramKeys, paramReg) {
        var params = {},
            url = url.indexOf('?') > -1 ? url.substring(0, url.indexOf('?')) : url,
            paramsVals = new RegExp('^' + paramReg + '$').exec(url)
        if (paramsVals) {
            var _i = 1
            for (var i = 0, len = paramKeys.length; i < len; i++) {
                var _paramKey = paramsVals[i + 1]
                if (paramKeys[i].type === 'int') {
                    _paramKey = +_paramKey
                }
                params[paramKeys[i].key] = _paramKey
            }
            return params
        }
        return null
    },
    match: function (url, reg, type) {
        var ret = this.getRegAndKeys(reg, type)
        if (!ret) return null
        return this.matchResult(url, ret.paramKeys, ret.paramReg)
    }
}

module.exports = MatchUrl
