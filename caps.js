'use strict';

// const port = process.env.PORT || 3000;

const io = require('socket.io')(3000);

io.on('connection', socket => {

    console.log('Engaged:', socket.id)

    socket.on('pickup', payload => {
        let pickupSocket = socket.id
        socket.broadcast.emit('pickup', {payload, pickupSocket})
        
    })

    socket.on('in-transit', payload => {
        socket.emit('in-transit', payload)
    })

    socket.on('delivered', payload => {
        socket.to(payload.pickupSocket).emit('delivered', payload)
    })
})
