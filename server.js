const express = require("express");
const app = express();
const dns = require("dns");
const router = require("./route");
require('dotenv').config();
const dbConfig = require("./configs/dbConfig");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dbConfig();
app.use(express.json());
app.use(router);

app.listen(8000, () => {
  console.log("Server is running");
});




// DB_URL=mongodb+srv://node2601-e-commerce:sFOuZlafQ7tvaPJc@cluster0.r33yxrd.mongodb.net/node2601-e-commerce?appName=Cluster0

// node2601-e-commerce