
#Description 描述

match-url is a pattern matching for url paths and query parameters,
match-url可以根据路径和正则匹配返回匹配结果，可以有下面两种匹配模式

    /path/{path1}

    /path/:path1


#Usage 用法

```javascipt
var MatchUrl = require('match-url')

var url = '/path/12'

MatchUrl.byBraces(url, '/path/{pn}')    // return {pn: '12'}
MatchUrl.byBraces(url, '/path/{pn:\\d+}')   // return {pn: 12}
MatchUrl.byColon(url, '/path/:pn')      // return {pn: '12'}
MatchUrl.byColon(url, '/path/:pn(\\d{2})')      // return {pn: 12}



var ret = MatchUrl.getRegAndKeys('/path/{pn:\\d+}') 
console.log(ret)
//{paramKeys:[{key:"pn", type:"int"}], paramReg: "/path/(\\d+)"}

var params = MatchUrl.matchResult(url, ret.paramKeys, ret.paramReg) //
console.log(params)
//{pn:12}
```