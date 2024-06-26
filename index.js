// Import required modules
const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const cors = require("cors");
const instituteSearchRouter = require("./routes/instituteSearchRoutes");

// Create Express app
const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  res.send("<h1><center>Welcome to Search Insitute backend</center></h1>");
});

app.use("/instituteSearch", instituteSearchRouter);

// Start the Express server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
