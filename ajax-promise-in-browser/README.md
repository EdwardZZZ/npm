
#Description

A ajax with promise, browser supports promise.
browse don't supports promise see <https://www.npmjs.com/package/ajax-promise-simple>


一个浏览器支持promise的ajax
浏览器不支持promise的请使用<https://www.npmjs.com/package/ajax-promise-simple>


#Usage 用法


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



