var React = require('react')
var ReactDom = require('react-dom')

var match = require('match-url')

var Router = React.createClass({
    getInitialState() {
        return {
            route: window.location.hash.substr(1)
        }
    },

    componentWillMount() {
        this.routers = Object.assign({}, this.props.routers)
        this.matchRoutes = []
    },

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            })
        })
    },

    render() {
        var _routers = this.routers,
            Child = this.state.route ? _routers[this.state.route] : _routers['default'],
            routeParams = {},
            matchRoutesLen = this.matchRoutes.length

        if (!Child && matchRoutesLen !== 0) {
            for (var i = 0; i < matchRoutesLen; i++) {
                var _router = this.matchRoutes[i]
                var paramReg = _router.paramReg, paramKeys = _router.paramKeys, component = _router.component
                var routeParams = match.matchResult(this.state.route, paramKeys, paramReg)
                if (routeParams) {
                    Child = component
                    break
                }
            }
        }

        if (!Child) {
            var _routesKeys = Object.keys(_routers)
            for (var i = 0, len = _routesKeys.length; i < len; i++) {
                var _routeKey = _routesKeys[i]
                var ret = match.getRegAndKeys(_routeKey, this.props.sign || 'braces')

                if (!ret) continue
                var paramReg = ret.paramReg, paramKeys = ret.paramKeys, component = _routers[_routeKey]
                this.matchRoutes.push({ paramReg: paramReg, paramKeys: paramKeys, component: component })

                delete _routers[_routeKey]

                var routeParams = match.matchResult(this.state.route, paramKeys, paramReg)
                if (routeParams) {
                    Child = component
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