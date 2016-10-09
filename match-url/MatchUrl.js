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
            paramReg = reg.replace(matchType[type] || matchType['braces'], function (m1, m2) {
                paramKeys[paramKeys.length] = m2
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
                params[paramKeys[i]] = paramsVals[i + 1]
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