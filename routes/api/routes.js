module.exports = function(app){
    app.use('/api/user', require('./user'));
	app.use('/api/message', require('./message'));
};