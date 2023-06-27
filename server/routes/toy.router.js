const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    console.log("Inside router side of get request");
  
    if (req.isAuthenticated()) {
    const queryText = `SELECT * FROM "toy_info"`;
    pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
      console.log("Sending items back from the server:", result.rows);
    }).catch((error) => {
      console.log("Error in fetching data from database", error)
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
  });


  module.exports = router;
