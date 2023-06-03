const express = require("express");

const router = express.Router();

router.post("/foodData", async (req, res) => {
  try {
    res.send([global.food_catagory, global.food_items]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
