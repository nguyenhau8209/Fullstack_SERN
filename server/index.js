const express = require("express");
const app = express();
const port = 3001;

const db = require("./models");
const cors = require("cors");

//Routers
const postRouter = require("./routes/Posts");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to fullstack SERN");
});

app.use("/posts", postRouter);
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Arif Posts Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple Post API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "skills with arif",
        url: "arif.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
});
