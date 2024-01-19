import express from "express";
import bodyParser from "body-parser";
const app = express();
const PORT = 3001;
const URL = "/api/greetings";

const __dirname = "D:/.git-repositories/NodeJs/";

//http://localhost:3001/api/greetings?name=Egor
app.use(bodyParser.urlencoded({ extended: true }));

app.get(URL, function (req, res) {
  try {
    const name = req.query.name;

    if (name) {
      res.send(`hello ${name}`);
    } else {
      throw new Error("there is no value");
    }
  } catch (error) {
    //next(error);
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post("/quotes", (req, res) => {
  console.log(req.body);
});

console.clear();

console.log(
  `\n--------------------
  \nStarteed at port: ${PORT}
  \nHere is your link: http://localhost:${PORT}/
  \n--------------------`
);

app.listen(PORT);
