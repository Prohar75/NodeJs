import express from "express";
const app = express();
const PORT = 3000;
const URL = "/api/greetings";

//http://localhost:3000/api/greetings?name=Egor

app.get(URL, function (req, res) {
  try {
    const name = req.query.name;

    if (name) {
      res.send(`hello ${name}`);
    } else {
      throw new Error("there is no value");
    }
  } catch (error) {
    next(error);
  }
});

app.listen(PORT);
