    const bodyParser = require('body-parser'),
        http = require ('http'),
        express = require ('express'),
        chat = require('./Chat'),
        socketio = require('socket.io')

    const port = port = process.env.PORT || 3000,
        app = express(),
        server = http.createServer(app)
        io = socketio(server)

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.static('public'))
    app.use('/Chat', chat)

    server.listen(port, () =>
      console.log('Server is running: '+ port);
    )

    io.on('Connetion', function(socket){
      console.log('new user contectado: '+socket.id);

      socket.on('userJoin', user=>{
        socket.user = user
        socket.broadcast.emit('userJoin', user)

      })

      socket.on('message', message=>{
        socket.broadcast.emit('message', message)

      })

      socket.on('disconect', ()=>{
        if (socket.hasOwnProperty('user')) {
          deleteUser(socket.user, err, confirm =>{
            if (err) throw err
          })
        }
    })
