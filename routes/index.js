module.exports = function(app) {

  app.get('/', require('./frontpage').get);

  app.get('/cabinet', require('./cabinet').get);  
  app.post('/cabinet', require('./cabinet').post);

  app.get('/registration', require('./registration').get);
  app.post('/registration', require('./registration').post);

  app.get('/login', require('./login').get);
 
  app.post('/login', require('./login').post);
  app.post('/logout', require('./logout').post);     
};
