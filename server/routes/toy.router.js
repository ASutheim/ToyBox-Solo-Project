const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
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
  GROUP BY toy_info.id, toy_info.owner_id, toy_info.name, toy_info.description, toy_info.picture_url, toy_info.status;`;
    pool
      .query(queryText)
      .then((result) => {
        res.send(result.rows);
        console.log("Sending items back from the server:", result.rows);
      })
      .catch((error) => {
        console.log("Error in fetching data from database", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.post("/", async (req, res) => {
  const client = await pool.connect();
  console.log("Inside router side of post request");
  if (req.isAuthenticated()) {
    try {
      await client.query("BEGIN");

      //First phase of post inserts the 1 to 1 info into the toy_info table
      const queryText1 = `INSERT INTO "toy_info" (owner_id, name, description, picture_url) VALUES ($1, $2, $3, $4)`;
      const values1 = [
        req.body.owner_id,
        req.body.name,
        req.body.description,
        req.body.picture_url,
      ];
      await client.query(queryText1, values1);
      await client.query("COMMIT");

      //Second phrase of post loops over the same query for each value in the array of 'categories'
      const queryText2 = `INSERT INTO "toy_category" (toy_id, category_id) VALUES ($1, $2)`;
      const categoriesArray = req.body.categories;
      for (let i = 0; i < categoriesArray.length; i++) {
        await client.query(queryText2, categoriesArray[i]);
      }

      //Third phase of post loops over the same query for each value in the array of 'ages'
      const queryText3 = `INSERT INTO "toy_age" (toy_id, age_id) VALUES ($1, $2)`;
      const ageArray = req.body.age;
      for (let i = 0; i < ageArray.length; i++) {
        await client.query(queryText3, ageArray[i]);
      }

      //Commit the transaction
      await client.query("COMMIT");

      client.release();
      res.status(200);
      console.log("New toy data successfully inserted into database");
    } catch (error) {
      // Rollback the transaction if any error occurred
      await client.query("ROLLBACK");
      client.release();

      console.error("Error occurred:", error);
      res.status(500);
    }
  }
});

module.exports = router;
