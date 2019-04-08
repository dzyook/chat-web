var express = require('express');
var app = express();
var path = require("path");
var server = require('http').Server(app);
var io = require('socket.io')(server);

// var bodyParser = require("body-parser")

const users = [];
const chatRecord = [];
const nowLogin = [];

function reqOptions(name) {
  app.options(name, function (req, res) {
    if(req.headers.origin) {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "content-type, x-requested-with",
      })
    }
    res.end();
  })
}

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
 console.log('连接上了')
 	io.emit('disUser', nowLogin.length);

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

reqOptions('/register');
app.post('/register', function (req, res) {
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
    let str = '';
    req.on("data",function(dt){
      str+=dt
    })
    req.on("end",function(){
      let data = JSON.parse(str);
      if(users.findIndex(i => i.regID === data.datas.regID) > -1) {
        people.code = 's0001';
        people.msg = '此账号已经存在';
      }
      else users.push(data.datas);
      res.end(JSON.stringify(people));
    })
  }
});

reqOptions('/login');
app.post('/login', function(req, res) {
  if(req.headers.origin) {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type,x-requested-with ",
    });
    const people = {
      code: 0,
      data: {},
      msg: '登录成功',
    }
    let str = '';
    req.on("data",function(dt){
      str+=dt
    })
    req.on("end",function(){
      let data = JSON.parse(str);
      console.log(users.findIndex(i => (i.regID === data.datas.id && i.regPassword === data.datas.password)) === -1)
      if(users.findIndex(i => (i.regID === data.datas.id && i.regPassword === data.datas.password)) === -1) {
        people.code = 's0001';
        people.msg = '账号或密码错误';
      }
      else {
        if(nowLogin.findIndex(i => i.regID === data.datas.id) === -1) nowLogin.push(data.datas)
      }
      res.end(JSON.stringify(people));
    })
  }
})

server.listen(3000, function() {
	console.log('App listening on port 3000!');
});