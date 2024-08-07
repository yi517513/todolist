require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const todoRoute = require("./routes/todo");
const profileRoute = require("./routes/profile");
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/testDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

app.use("/api/user", authRoute);

// 兩種存取todo，受JWT保護(伺服器儲存)，不受JWT保護(本地儲存-React處理)
app.use(
  "/api/todo",
  passport.authenticate("jwt", { session: false }),
  todoRoute
);

app.use(
  "/api/profile",
  passport.authenticate("jwt", { session: false }),
  profileRoute
);

app.listen(8080, () => {
  console.log("Server is running on port 8080....");
});
