
#react-router-hash

A minimal router for react app, only supports hash url

React极简路由，仅支持hash url,可以采用两种方式进行路由配置，其中第二种配置必须在Router节点上配置sign="colon"

支持简单正则格式，例如数字，这样在组件中获取的参数也是数字

第一种支持嵌套格式

##第一种 没有default配置 No default config
```javascript
render((
    <Router /* sign="colon" */>
        <Login path="login" />
        <List path="list">
            <List path="/{pn:\\d+}">
        </List>
        <Detail path="detail/{id:\\d+}">
        <Aboutus path="aboutus" >
            <Aboutus path="/{a}" >  /* switch a 可以根据a值在Aboutus内做逻辑操作 */
                <Aboutus path="/{b}" />
            </Aboutus>
            <Aboutus path="/{a}/{c}/d" />
        </Aboutus>
    </Router>
), document.getElementById('app'));
```

##第二种 可以有default配置 Has default config
```javascript
let routers = {
    'login': Login,
    'list': List,
    // 'list/:pn': List,
    'list/:pn(\\d+)': List,
    'aboutus':Aboutus,
    'aboutus/:a(\\S+)':Aboutus,     // switch a 根据a值在Aboutus内做逻辑操作
    'default': Login                // default config
}
render((
    <Router routers={routers} sign="colon" />
), document.getElementById('app'));
```


##Usage 用法

```javascript
import Router from 'react-router-hash';

import Login from './components/Login';
import List from './components/List';
import Detail from './components/Detail';
import Aboutus from './components/Aboutus';

let routers = {
    'login': Login,
    'list': List,
    'list/{pn}': List,
    // 'list/{pn:\\d+}': List,
    'detail/{id}': Detail,
    'detail/{id}/': Detail,
    'default': Login,
    'aboutus':Aboutus,
    'aboutus/{a:\\S+}':Aboutus
}

render((
    <div>
        <div>
            <a href="#login">login</a>
            <a href="#list">list</a>
            <a href="#aboutus">aboutus</a>
        </div>
        <Router routers={routers} /* sign="colon" */ />
    </div>
), document.getElementById('app'));

//List.jsx
export default class List extends React.Component {
    constructor(props) {
        super();
    }
    render(){
        // get pn value
        console.log(this.props.pn)
    }
}

```

