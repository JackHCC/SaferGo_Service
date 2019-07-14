var createError = require('http-errors');
var http = require('http')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sio = require('socket.io');

var userRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var searchRouter = require('./routes/search');
var addFriendRouter = require('./routes/addfriend');


var Login = require('./event/Login');
var Chat = require('./event/Chat');
var Protect = require('./event/Protect');
var Logout = require('./event/Logout');
var userEmail = require('./event/userEmail');
var SetInfor = require('./event/SetInfor');
var getInfor = require('./event/getInfor');
var AddFriend = require('./event/AddFriend');
var GetFriend = require('./event/GetFriend');

var app = express();
var server = http.createServer(app);
var io = sio.listen(server);

var onlineUser = {};
var userSocket = {};

io.on("connection", socket => {
    socket.on('login', data => {
        // console.log(data)
        Login(data, socket, onlineUser, userSocket);
    });

    socket.on("chat", data =>{
        Chat(data, onlineUser);
    })

    socket.on('protect', data => {
        Protect(data, socket, onlineUser);
    })

    socket.on('logout', data =>{
        Logout(data, socket, onlineUser);
    })

    socket.on('userEmail', data => {

        userEmail(data, socket);
    })

    socket.on('SetInfor', data => {
        SetInfor(data, socket)
    })

    socket.on('getInfor', data => {
        getInfor(data, socket)
    })

    socket.on("AddFriend", data => {
        AddFriend(data, socket)
    })

    socket.on("GetFriend", data => {
        GetFriend(socket)
    })


});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/updataUser', userRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/search', searchRouter);
app.use('/friend',addFriendRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(4000,() => {
    console.log("listening on 3000");
})




