const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// routes
const authRouter = require("./routes/auth-routes");
const courseRoute = require("./routes/course-routes");
const groupRoute = require("./routes/group-routes");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db is connected successfully");
    app.listen(process.env.PORT);
  })
  .catch(error => {
    console.log(error);
  });

app.use(express.static("public"));
app.use(express.json());

app.get("/", (_, res) => {
  res.send({ connected: true });
});

app.use("/api/user", authRouter);
app.use("/api/courses", courseRoute);
app.use("/api/groups", groupRoute);
