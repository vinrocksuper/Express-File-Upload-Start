const File = require('../models/filestore.js');

const uploadPage = (req, res) => {
  res.render('upload');
};

const uploadFile = (req, res) => {

};

const retrieveFile = (req, res) => {
  
};

module.exports = {
  uploadPage,
  uploadFile,
  retrieveFile
}