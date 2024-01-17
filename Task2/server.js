import express from "express";
import bodyParser from "body-parser";
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  /*...*/
});

app.post("/quotes", (req, res) => {
  console.log(req.body);
});

console.log(
  `\n--------------------
  \nStarteed at port: ${PORT}
  \nHere is your link: http://localhost:${PORT}/
  \n--------------------`
);

app.listen(PORT);
