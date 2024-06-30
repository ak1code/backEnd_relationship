const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/userRoute");
const { noteRoute } = require("./Routes/noteRoute");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Wellcome to home page");
});
app.use("/user", userRouter);
app.use("/note", noteRoute);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("server is running");
  } catch (error) {
    console.log("error", error);
  }
});
