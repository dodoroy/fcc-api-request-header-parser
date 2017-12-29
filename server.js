
var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true)
  // console.log(req.rawHeaders)
  var headers = req.rawHeaders

    var ip = ''
    var lan = ''
    var sw = ''
  headers.forEach(function(e, i) {
    if(e == 'accept-language') {
      lan = headers[i+1].split(',')[0]
    } else if(e == 'user-agent') {
      var arr = headers[i+1].split(' ')
      sw = arr[1] + ' ' + arr[2] + ' ' + arr[3]
    } else if(e == 'x-forwarded-for') {
      ip = headers[i+1].split(',')[0]
    }
  })
  var result = {'ipaddress': ip, 'language': lan, 'software': sw}
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(result))
})

server.listen(process.env.PORT)