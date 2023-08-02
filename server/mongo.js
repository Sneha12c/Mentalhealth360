

// // mongodb://127.0.0.1:27017/my-database

// //again

// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');

// const mongoURI = 'mongodb://127.0.0.1:27017/abhiabhi'; //  MongoDB connection string
// const dbName = 'abhiabhi'; //  MongoDB database name

// // Connect to MongoDB
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected');
//   })
//   .catch((error) => {
//     console.error('Failed to connect to MongoDB:', error);
//   });

// //  user schema and model
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String
// });

// const User = mongoose.model('User', userSchema);

// app.use(express.json());

// app.post('/register', (req, res) => {
//   const { name, email, password } = req.body;

//   // Creating a new user instance
//   const newUser = new User({
//     name,
//     email,
//     password
//   });

//   // Saving the user to the database
//   newUser.save()
//     .then(() => {
//       res.status(200).json({ message: 'User registered successfully' });
//     })
//     .catch((error) => {
//       console.error('Failed to register user:', error);
//       res.status(500).json({ error: 'Failed to register user' });
//     });
// });

// app.listen(3001, () => {
//   console.log('Server is running on port 3001');
// });


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Parse JSON request bodies
app.use(bodyParser.json());

// Connect to your MongoDB database
mongoose.connect("mongodb+srv://admin:admin@cluster0.a0sc2ac.mongodb.net/MentalHealth?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});

connection.once("open", () => {
  console.log("Connected to MongoDB database.");
});

// Define a Mongoose schema for the data
const dataSchema = new mongoose.Schema({
  otp: String,
  data: String,
});

// Create a Mongoose model based on the schema
const Data = mongoose.model("Data", dataSchema);

// Define the route to store data
app.post("/api/storeData", async (req, res) => {
  const { otp, data } = req.body;

  try {
    // Check if data with the same otp already exists
    const existingData = await Data.findOne({ otp });

    if (existingData) {
      // Calculate the average of the old and new data
      const newData = (Number(existingData.data) + Number(data)) / 2;
      existingData.data = newData.toString();
      await existingData.save();
      console.log("Data modified successfully.");
    } else {
      // Create a new data document
      const newData = new Data({ otp, data });
      await newData.save();
      console.log("Data stored successfully.");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error storing/modifying data:", error);
    res.sendStatus(500);
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000.");
});
