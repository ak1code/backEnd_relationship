const mongooose = require("mongoose");
require("dotenv").config();

const connection = mongooose.connect(process.env.API_URL);

module.exports = { connection };
