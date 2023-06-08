const express = require('express');
const model = require('../models');

const router = express.Router();

router.post('/', (req, res) => {
  const info = req.body;
  model.addContractor(info, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send('added');
    }
  });
});

router.get('/', (req, res) => {
  const coordinates = req.query.zip;
  const searchTerm = req.query.search;
  model.getContractors(coordinates, searchTerm, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

module.exports = router;
