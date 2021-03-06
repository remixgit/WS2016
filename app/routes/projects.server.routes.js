//var users = projects = require('../../app/controllers/users.server.controller'),
var projects = require('../../app/controllers/projects.server.controller');

module.exports = function(app){

    app.route('/api/projects')
    .post(projects.create)
    .get(projects.list);
    app.route('/api/projects/:projectId')
      .get(/*users.requiresLogin,*/ projects.read)
      .put(/*users.requiresLogin, projects.hasAuthorization,*/projects.update)
      .delete(/*users.requiresLogin, projects.hasAuthorization,*/ projects.delete);
    app.param('projectId', projects.projectByID);
}
