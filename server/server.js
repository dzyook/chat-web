var express = require('express');
var app = express();
var path = require("path");
var md5 = require('md5-node');
var server = require('http').Server(app);
var io = require('socket.io')(server);
const MongoClient = require('mongodb').MongoClient;
// var bodyParser = require("body-parser")

const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'test1';
// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true } ,function(err, client) {
  if(err){
    console.log(err);
  }
  console.log("connect successful");
  db = client.db(dbName);
});

// let users = []; // 注册人数
const chatRecord = []; 
const nowLogin = []; // 目前登陆人数

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
		// io.emit('disUser', num);
	});
	
});

app.get('/',  function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
	return res.send('hello world');
});

// 注册接口
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
      const col = db.collection('chatlist');
      col.find().toArray((err, users) => {
        if(users.findIndex(i => i.regID === data.datas.regID) > -1) {
          people.code = 's0001';
          people.msg = '此账号已经存在';
        }
        else {
          db.collection('chatlist', {safe: true}, function(err, collection) {
            data.datas.regPassword = md5(data.datas.regPassword);
            data.datas.isactive = 0;
            collection.insertOne(data.datas, {safe: true}, function(err, result){})
          })
        };
        res.end(JSON.stringify(people));
      });
    })
  }
});

// 登陆接口
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
      const col = db.collection('chatlist');
      col.find().toArray((err, users) => {
        if(users.findIndex(i => (i.regID === data.datas.id && i.regPassword === md5(data.datas.password))) === -1) {
          people.code = 's0001';
          people.msg = '账号或密码错误';
        }
        else {
          db.collection('chatlist', {safe: true}, function(err, collection) {
            collection.updateOne({regID: data.datas.id}, {$set: {isactive: 1}}, {safe: true}, function(err, res){
              console.log(res)
            })
          })
          // const fri = db.collection('friendsList');
          
          // fri.find({regID: '111111'}).toArray((err, res) =>{
          //   console.log(res)
          // })
        }
        res.end(JSON.stringify(people));
      })
    })
  }
})

server.listen(3000, function() {
	console.log('App listening on port 3000!');
});