const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");
const app = express();
const { DATABASE_URI, PORT } = process.env;

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend's actual origin
  credentials: true,
};

app.use(cors(corsOptions));

// const userRoutes = require("./Routes/UserRoutes")

// Replace 'your_database_url' with the actual URL of your MongoDB database

// Connect to MongoDB
mongoose
  .connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: { w: true },
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the Express.js server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json());

app.use("/users", require("./Routes/UserRoutes"));
app.use("/auth", require("./Routes/AuthRoutes"));
app.use("/posts", require("./Routes/PostRoutes"));
