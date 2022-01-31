const express = require('express');
const router = express.Router();
const multer = require('multer');

// import csv schema

const Csv = require('../models/csv.model');

// this is the static route for serving files

router.use('/static', express.static('csvs'));

// get all csvs

router.get('/', (req, res) => {
  Csv.find()
    .then((csvs) => res.json(csvs))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// create multer object for csv file storage

const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'csvs/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

// create csv by destructuring for the req body and file properties

router.post('/add', imageUpload.single('file'), async (req, res) => {
  try {
    const { filename, mimetype, size } = req.file;
    const { description, title } = req.body;
    const filepath = req.file.path;

    const newCsv = new Csv({
      description,
      filename,
      filepath,
      mimetype,
      size,
      title,
    });

    await newCsv.save();
    res.json('Csv added');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

//delete csv by id
router.delete('/:id', (req, res) => {
  Csv.findByIdAndDelete(req.params.id)
    .then(() => res.json('Csv deleted'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
