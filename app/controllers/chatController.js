module.exports.chat = function(req, res){
	res.render('chat')
}

module.exports.chatPost = function(req, res, app){
	var nome = req.body.nome
	req.assert('nome', 'Nome deve ter entre 3 e 15 caracteres').len(3,15)
	req.assert('nome', 'Nome é obrigatório').notEmpty()

	if(app.get('pessoas').indexOf(nome) != -1){
		req.assert('nome', 'Nome já está sendo usado').len(16, 16)
	}

	var error = req.validationErrors()
	if(error){
		res.render('index', {errors : error})
		return
	}

	app.get('io').emit('entrou', nome)
	res.render('chat', {usuario : nome}) 
}