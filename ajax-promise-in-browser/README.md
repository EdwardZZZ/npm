
#Description

A ajax base promise, browser supports promise.

browse don't supports promise use <https://www.npmjs.com/package/ajax-promise-simple>


一个浏览器支持promise的ajax

浏览器不支持promise的请使用<https://www.npmjs.com/package/ajax-promise-simple>


#Usage 用法
```javascipt
var ajaxPromise = require('ajax-promise-simple')

/**
    有四个属性方法：
    ajaxPromise.get => return text
    ajaxPromise.getJSON  => return JSON
    ajaxPromise.post => return text
    ajaxPromise.postJSON  => return JSON
*/

ajaxPromise[get|getJSON|post|postJSON](url, params)
.then(function(data){
})
.catch(function(error){
})
```

###ES5
```javascipt
var ajax = require('ajax-promise-in-browser')

ajax.get('http://***/login', 
    {username:aaa, password:123456})
.then(function(data){
})
.catch(function(error){

})
```

###ES6
```javascipt
ajax.post('http://***/login', 
    {username:aaa, password:123456})
.then((data) => {
})
.catch((error) => {

})



