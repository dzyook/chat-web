var express = require('express');
var app = express();
var path = require("path");
var server = require('http').Server(app);
var io = require('socket.io')(server);

// var bodyParser = require("body-parser")
var num = 0;
const users = [];
const chatRecord = [];

// apiRouter(app);
app.use('/', express.static(__dirname + '../dist'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

io.sockets.on('connection', function(socket) {
  // 每个连接的用户都有专有的socket
  /* 
    io.emit(foo); //会触发所有用户的foo事件
    socket.emit(foo); //只触发当前用户的foo事件
    socket.broadcast.emit(foo); //触发除了当前用户的其他用户的foo事件
  */
 	num++;
 	io.emit('disUser', num);

  socket.on('new message', function (chatinfo) {
		chatRecord.push(chatinfo);
		io.emit
	});
	
	socket.on('disconnect',() => {
		num--; 
		io.emit('disUser', num);
	});
	
});

	

app.get('/',  function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
	return res.send('hello world');
});
app.options('/login', function (req, res) {
  if(req.headers.origin) {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type, x-requested-with",
    })
  }
  res.end();
})
app.post('/login', function (req, res) {
  if(req.headers.origin) {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type,x-requested-with ",
    });
    const people = {
      code: 0,
      data: {},
      msg: '注册成功',
    }
    console.log(req.body)
    let str = '';
    req.on("data",function(dt){
      str+=dt
    })
    req.on("end",function(){
      console.log(str)
    })
    res.end(JSON.stringify(people));
  }
});


server.listen(3000, function() {
	console.log('App listening on port 3000!');
});