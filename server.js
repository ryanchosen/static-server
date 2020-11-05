var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
  console.log(request.headers); //输出请求头
  // 这里写了一个静态服务器，静态服务器的意思就是用于提供静态资源访问的功能，如图片、CSS、JS等
  // 不支持动态页面和数据库的服务器
  // 默认首页
  const localpath=path==='/'?'/index.html':path;
    response.statusCode = 200
    // 动态获取用户输入的文件类型以设置正确的content-type
    let index=localpath.lastIndexOf('.');
    let filetype=localpath.substring(index);
    const filetypes={
      '.html':'text/html',
      '.css':'text/css',
      '.js':'text/javascript',
      '.png':'image/png',
    }
    response.setHeader('Content-Type', `${filetypes[filetype]};charset=utf-8`)
    response.setHeader('Ryan','GettingBetter') //设置响应头
    //response.write 设置响应体的内容
    let content
    try{content=fs.readFileSync(`./public${localpath}`)}catch(error){
      content='文件不存在'
      response.statusCode = 404
    }
    response.write( content)
    response.end()

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

