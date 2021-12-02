const io = require('socket.io')(8900, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
        users.push({ userId, socketId })
}

const getUser = (userId)=>{
    return users.find(user => user.userId === userId);
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

io.on('connection', (socket) => {
    console.log('a user is connected');

    //CONNECTION
    socket.on('addUser', userId => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    //SEND MESSAGE
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit('getMessage', {
            senderId, text  
        })
    })

    //DISCONNECTION
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id)
        io.emit('getUsers', users);
    })
})


// io.on('connection', (socket)=>{
//     console.log('connected')
//     io.emit('welcome', 'hello from socket server')
// })