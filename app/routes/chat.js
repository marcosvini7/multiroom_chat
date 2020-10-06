module.exports = function(app){
	app.get('/chat', (req, res) => {
		app.app.controllers.chatController.chat(req, res)
	})

	app.post('/chat', (req, res) => {
		app.app.controllers.chatController.chatPost(req, res, app)
	})
}