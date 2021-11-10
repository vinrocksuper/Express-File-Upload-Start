const file = require('./controllers/files.js');

const router = (app) => {
  app.post('/upload', file.uploadFile);

  app.get('/retrieve', file.retrieveFile);

  app.get('/', file.uploadPage);
};

module.exports = router;
