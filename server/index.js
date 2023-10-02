const express = require("express");
const app = express();
const port = 3001;

const db = require("./models");
const cors = require("cors");

//Routers
const postRouter = require("./routes/Posts");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to fullstack SERN");
});

app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
});
