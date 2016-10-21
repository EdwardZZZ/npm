
#Description 描述

用来获取网络连接内容

#Usage 用法

```javascipt
// 1
httpConnection(url)
.config(requestConfig)
.headers({
    Cookie: 'model=9'
})
.data({
})
.port(80)
.method('POST')
.getData(function (data) {
    console.log(data)
})
.getConfig(function (config) {
    console.log(config)
})
.getContent(function (content) {
    console.log(content)
})

//2
httpConnection(url).getContent()

//3
httpConnection(url).data({key: 'val'}).getContent()

//4
httpConnection().config(requestConfig).getContent
```