var React = require('react')
var ReactDom = require('react-dom')

var match = require('match-url')

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
                var _routeKey = _routesKeys[i]
                routeParams = match[this.props.sign==='colon'?'byColon':'byBraces'](this.state.route, _routeKey)

                if(routeParams){
                    Child = _routers[_routeKey]
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