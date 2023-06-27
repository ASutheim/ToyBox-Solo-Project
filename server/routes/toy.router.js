const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    console.log("Inside router side of get request");
  
    if (req.isAuthenticated()) {
    const queryText = `SELECT toy_info.id, toy_info.owner_id, toy_info.name, toy_info.description, toy_info.picture_url, toy_info.status,
    ARRAY_AGG(DISTINCT category.category_name) AS toy_categories,
    ARRAY_AGG(DISTINCT age.age_name) AS toy_ages
    FROM toy_info
  JOIN toy_category ON toy_info.id = toy_category.toy_id
  JOIN category ON toy_category.category_id = category.id
  JOIN toy_age ON toy_info.id = toy_age.toy_id
  JOIN age ON toy_age.age_id = age.id
  GROUP BY toy_info.id, toy_info.owner_id, toy_info.name, toy_info.description, toy_info.picture_url, toy_info.status;`
  ;
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


  router.post('/', (req, res) => {

    if (req.isAuthenticated()){ 

        const queryText = `INSERT INTO "toy_info" (toy_info.id, toy_info.owner_id, toy_info.name, toy_info.description, toy_info.picture_url) VALUES ($1, $2, $3)`
        console.log(req.body);
        console.log(req.user);
        pool.query(queryText, [req.body.image_url , req.body.description , req.user.id ])
            .then(result => {
                res.sendStatus(201)
            }).catch(err => {
                console.log('Error in POST /shelf.router' , err)
                res.sendStatus(500)
            })
    } else {
        res.sendStatus(403);
    }
});

  module.exports = router;
