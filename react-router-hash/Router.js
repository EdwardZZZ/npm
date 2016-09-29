var React = require('react')
var ReactDom = require('react-dom')

var Router = React.createClass( {
    getInitialState() {
        return {
            route: window.location.hash.substr(1)
        }
    },

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            })
        })
    },

    render() {
        var _routers = this.props.routers,
            Child = this.state.route ? _routers[this.state.route] : _routers['default'],
            routeParams = {}

        if (!Child) {
            var _routesKeys = Object.keys(_routers)
            for (var i = 0, len = _routesKeys.length; i < len; i++) {
                routeParams = {}
                var _routeKey = _routesKeys[i],
                    _matchFlag = true,
                    _routeKeyReg = _routeKey.replace(/{([^{}]+)}/g, (m1, m2) => {
                        _matchFlag = false
                        routeParams[m2] = null
                        return '([^\/]+)'
                    })
                if(_matchFlag) continue
                
                var _params = new RegExp('^' + _routeKeyReg + '$/g').exec(this.state.route)
                if(_params){
                    Child = _routers[_routeKey]
                    var _i = 1
                    for (var k in routeParams) {
                        routeParams[k] = _params[_i++]
                    }
                    break
                }
            }
        }

        if (!Child) {
            Child = _routers['default']
        }

        return React.createElement(Child, routeParams)
    }
})

module.exports = Router