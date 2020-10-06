module.exports = function(app){
	app.get('/', (req, res) => {
		app.app.controllers.indexController.index(req, res)
	})
}