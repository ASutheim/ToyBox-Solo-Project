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
  console.log("Inside router side of post request");
  console.log("router post body", req.body);
  const client = await pool.connect();

  if (req.isAuthenticated()) {
    try {
      await client.query(`BEGIN;`);

      //First phase of post inserts the 1 to 1 info into the toy_info table
      const queryText1 = `INSERT INTO "toy_info" (owner_id, name, description, picture_url) VALUES ($1, $2, $3, $4) RETURNING id;`;
      const values1 = [
        req.body.owner_id,
        req.body.name,
        req.body.description,
        req.body.picture_url,
      ];

      // Save the successful post on the toy table as a result, so we can access it later.
      const result = await client.query(queryText1, values1);
      await client.query(`COMMIT;`);

      // Grab the id of the newlyCreatedToy, so we can use that to insert into our join tables.
      const newlyCreatedToyId = result.rows[0].id;
      console.log("lookie here! A new toy was created!", newlyCreatedToyId);

      //Second phrase of post loops over the same query for each value in the array of 'categories'
      const queryText2 = `INSERT INTO "toy_category" (toy_id, category_id) VALUES ($1, $2)`;
      const categoriesArray = req.body.categories;
      for (let i = 0; i < categoriesArray.length; i++) {
        await client.query(queryText2, [newlyCreatedToyId, categoriesArray[i]]);
      }
      //Commit the transaction
      await client.query(`COMMIT;`);

      //Third phase of post loops over the same query for each value in the array of 'ages'
      const queryText3 = `INSERT INTO "toy_age" (toy_id, age_id) VALUES ($1, $2)`;
      const ageArray = req.body.age;
      for (let i = 0; i < ageArray.length; i++) {
        await client.query(queryText3, [newlyCreatedToyId, ageArray[i]]);
      }

      console.log("New toy data successfully inserted into database");

      //Commit the transaction
      await client.query(`COMMIT;`);

      res.sendStatus(201);
    } catch (error) {
      // Rollback the transaction if any error occurred
      await client.query(`ROLLBACK;`);

      console.error("Error occurred:", error);
      res.sendStatus(500);
    } finally {
      console.log("made it here?");
      // Assuming that everything worked, release the connection to the database.
      client.release();
      console.log("released");
    }
  }
});

module.exports = router;
