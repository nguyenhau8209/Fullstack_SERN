const express = require("express");
const app = express();
const port = 3000;

const db = require("./models");

//Routers
const postRouter = require("./routes/Posts");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to fullstack SERN");
});

app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
});
