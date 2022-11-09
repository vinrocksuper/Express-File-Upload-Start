const File = require('../models/filestore.js');

const uploadPage = (req, res) => {
  res.render('upload');
};

const uploadFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'no files uploaded' });
  }

  const { sampleFile } = req.files;
  console.log(sampleFile);

  try {
    const newFile = new File(sampleFile);
    const doc = await newFile.save();
    return res.status(201).json({
      message: 'file stored successfully',
      fileID: doc._id,
    })
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: 'error uploading file',
    })
  }
};

const retrieveFile = async (req, res) => {
  if (!req.query._id) {
    return res.status(400).json({
      error: 'missing file id',
    })
  }

  let doc;
  try {
    doc = await File.findOne({ _id: req.query._id }).exec();
    // doc = await File.findById(_id).exec();
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: 'error retrieving file',
    })
  }

  if (!doc) {
    return res.status(404).json({ error: 'file not found!' });
  }

  res.set({
    'Content-Type': doc.mimetype,
    'Content-Length': doc.size,
    'Content-Disposition': `filename="${doc.name}"`,

  });

  return res.send(doc.data);
};

module.exports = {
  uploadPage,
  uploadFile,
  retrieveFile
}