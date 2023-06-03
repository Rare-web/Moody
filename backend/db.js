const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://moody:Devkumar2612@cluster0.gdeuijt.mongodb.net/moody?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected!");
    let fetched_data = mongoose.connection.db.collection("food_items");
    let data = await fetched_data.find({}).toArray();
    let food_catagory = mongoose.connection.db.collection("food_category");
    let catData = await food_catagory.find({}).toArray();
    global.food_catagory = catData;
    global.food_items = data;
    // console.log("data", catData);
    // getUsers();
  } catch (error) {
    console.log("err: ", error);
    process.exit();
  }
};

module.exports = mongoDB;
