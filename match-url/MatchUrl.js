var matchType = {
    braces: /{([^{}]+)}/g,
    colon: /:([^\/]+)/g
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
            paramReg = reg.replace(matchType[type], function (m1, m2) {
                if (type === 'braces') {
                    var arr = m2.split(':')
                    if (arr.length === 2) {
                        paramKeys[paramKeys.length] = { key: arr[0], type: 'int' }
                        return '(' + arr[1] + ')'
                    }
                }
                paramKeys[paramKeys.length] = { key: m2 }
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