import express from "express";
const app = express();
const PORT = 3000;
const URL = "/api/greetings";

app.get(URL, function (req, res) {
  const name = req.query.Id;

  if (name) res.send(`hello ${name}`);
  else console.error("there is no value");
});

app.listen(PORT);
