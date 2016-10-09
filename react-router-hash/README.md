
#react-router-hash

A minimal router for react app, only supports hash url

React极简路由，仅支持hash url,可以采用两种方式进行路由配置，其中第二种配置必须在Router节点上配置sign="colon"
##第一种
```javascript
let routers = {
    'login': Login,
    'list': List,
    'list/{pn}': List,
    'detail/{id}': Detail,
    'default': Login
}
render((
    <Router routers={routers}  />
), document.getElementById('app'));
```

##第二种
```javascript
let routers = {
    'login': Login,
    'list': List,
    'list/:pn': List,
    'detail/:id': Detail,
    'default': Login
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

let routers = {
    'login': Login,
    'list': List,
    'list/{pn}': List,
    'detail/{id}': Detail,
    'default': Login
}

// let routers = {
//     'login': Login,
//     'list': List,
//     'list/:pn': List,
//     'detail/:id': Detail,
//     'default': Login
// }

render((
    <Router routers={routers}  />
), document.getElementById('app'));
```

