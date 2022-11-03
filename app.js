const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { query } = require("express");
app.use(express.json());
app.use(cors());
const productRouter = require("./router/tour.router");

app.use("/tour", productRouter);

module.exports = app;
