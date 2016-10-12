
#Description 描述

match-path is a pattern matching for url paths and query parameters,
match-path可以根据路径和正则匹配返回匹配结果，可以有下面两种匹配模式


#Usage 用法

```javascipt
var MatchUrl = require('match-path')
var url = '/path/12'


var match = MatchPath('path/:path(\\d+)', keys)
console.log(keys)
//{paramKeys:[{key:"pn", type:"int"}], paramReg: "/path/(\\d+)"}


var params = match.match(url)
console.log(params)
//{pn:12}
```