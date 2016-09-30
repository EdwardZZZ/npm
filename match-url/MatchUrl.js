var MatchUrl = {
    byBraces: function (url, reg) {
        return this.match(url, reg, /{([^{}]+)}/g)
    },
    byColon: function (url, reg) {
        return this.match(url, reg, /:([^\/]+)/g)
    },
    match: function (url, reg, type) {
        var params = {},
            _matchFlag = true,
            _paramReg = reg.replace(type, function (m1, m2) {
                _matchFlag = false
                params[m2] = null
                return '([^\/]+)'
            })
        if (_matchFlag) return null

        var _params = new RegExp('^' + _paramReg + '$').exec(url)
        if (_params) {
            var _i = 1
            for (var k in params) {
                params[k] = _params[_i++]
            }
            return params
        }
        return null
    }
}

module.exports = MatchUrl