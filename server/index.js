const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

const server = require('http').createServer(app);
const socket = require('socket.io');

const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

app.use(bodyParser.json());


const users = [{title: 'Angel', name:'Luke', password: 'abc123', room:'test'},{title:'Friend', name: 'Luis', password: 'abc123', room: 'test'}]

app.use(
    session({
        secret: '',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000 * 24 * 14
          }
    })
)

app.post('/api/v1/send-message', (req, res) => {
    console.log(req)
    client.messages
        .create({
            body: 'Your angel would like to chat.',
            from: '',
            to: ''
        })
})

app.post('/api/v1/login', (req, res) => {
    var { username, password } = req.body;
    var index = users.findIndex(user => {
        return user.name === username;
    });
    if(index === -1) {
        res.status(403).json({ message: 'An error has occurred. Please try again.' })
    };
    if(users[index].password !== password){
        res.status(403).json({ message: 'An error has occurred. Please try again.' })
    } ;
    req.session.user = { 
        username: users[index].name, 
        title:users[index].title,
        room: users[index].room };
    res.status(200).json(req.session.user);
});

app.post('/api/v1/logout', (req, res) => {
    req.session.destroy();
    res.status(200).end();
});

app.get('/api/v1/session-info', (req, res) => {
    res.status(200).json(req.session.user);
});

const io = require('socket.io')(server)

const roomManagement = {};

const  port = 4000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

io.on('connection', socket => {
    console.log('User connected.')

    socket.on('join room', data => {
        console.log(data);
        if(data.data.username){
            if(roomManagement[data.data.room]){
                roomManagement[data.data.room].push(data.data.user);
            } else {
                roomManagement[data.data.room] = [];
                roomManagement[data.data.room].push(data.data.user)
            }
        }
        socket.join(data.data.room)
        io.in(data.data.room).emit('room joined', {
            room: data.data.room,
            user: data.data.username,
            title: data.data.title
        })
    });

    socket.on('send message', data => {
        io.in(data.data.room).emit('new message', {
            user:data.data.username,
            message: data.message,
            title: data.data.title,
            room: data.data.room
        })
    });

});
