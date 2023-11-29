const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const { DATABASE_URI, PORT } = process.env;
// const userRoutes = require("./Routes/UserRoutes")

// Replace 'your_database_url' with the actual URL of your <link>MongoDB</link> database

// Connect to <link>MongoDB</link>
mongoose
  .connect(DATABASE_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the <link>Express.js</link> server after successful database connection
    app.listen(PORT, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to <link>MongoDB</link>:", error);
  });

app.use(express.json());

app.use("/users", require("./Routes/UserRoutes"));
app.use("/auth", require("./Routes/AuthRoutes"));
