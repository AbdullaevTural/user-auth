// Import the Express framework for creating a web server
const express = require("express");

// Import Mongoose for MongoDB interactions
const mongoose = require("mongoose");

// Import Express Session for managing user sessions
const session = require("express-session");

// Import routes from a separate file
const routes = require("./routes");

// Create an instance of the Express application
const app = express();

// Set the port number for the server to listen on
const port = 4000;

// Enable JSON parsing for incoming requests
app.use(express.json());

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" and "views" directories
app.use(express.static("public"));
app.use(express.static("views"));

// Configure session middleware with a secret key
app.use(
  session({
    secret: "keys1", // Replace with a secure secret key
    resave: true,
    saveUninitialized: true,
  })
);

// Connect to MongoDB using Mongoose
mongoose.connect(
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Use the defined routes for handling different endpoints
app.use("/", routes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
