const app = require('./config/server')

var server = app.listen(3003, () => {
	console.log('Servidor online na porta 3003')
})

var io = require('socket.io').listen(server)

app.set('io', io)

var pessoas = []
app.set('pessoas', pessoas)

io.on('connection', socket => {

	socket.on('disconnect', () => {
		
	})

	socket.on('conectou', (dados) => {
		pessoas.push(dados)
		socket.emit('listar_participantes', pessoas)
		socket.broadcast.emit('listar_participantes', pessoas)
		app.set('pessoas', pessoas)
	})

	socket.on('saiu', dados => {
		socket.broadcast.emit('saiu', dados)
		pessoas[pessoas.indexOf(dados)] = 0
		socket.broadcast.emit('listar_participantes', pessoas)
		app.set('pessoas', pessoas)
		
	})

	socket.on('enviou', dados => {
		socket.emit('enviou', dados)
		socket.broadcast.emit('enviou', dados)
	})
})

