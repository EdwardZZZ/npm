
function MatchPath(regexp, keys) {
    var paramKeys = [],
        paramReg = regexp.replace(/:(([^\/\(\)]+)(\(([^\/]+)\))?)/g, function () {
            var _type = arguments[4]
            if (_type !== void 0) {
                var _paramKey = { key: arguments[2] }
                if (_type.indexOf('d') > -1) {
                    _paramKey.type = 'int'
                }
                paramKeys[paramKeys.length] = _paramKey
                return '(' + _type + ')'
            }
            paramKeys[paramKeys.length] = { key: arguments[1] }
            return '([^\/]+)'
        })
    keys.paramReg = paramReg
    keys.paramKeys = paramKeys
    return {
        match: function (path) {
            var params = {},
                path = path.indexOf('?') > -1 ? path.substring(0, path.indexOf('?')) : path,
                paramsVals = new RegExp('^' + paramReg + '$').exec(path)
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
        }
    }
}

module.exports = MatchPath
