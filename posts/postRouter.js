const express = require('express');
const dataB = require('./postDb.js');


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const db = await dataB.find(req.query);
        res.status(200).json(db);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the db',
        });
      }
    });


router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;