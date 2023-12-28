const express = require("express")
const app = express()
const port = 3000;
const fs = require("fs");

let jsonName

fs.readFile("api/greetings.json", 'utf-8', (err, data) => {
  if (err) {
    console.error('Error: ', err);
    return;
  }
  jsonName = JSON.parse(data);
});
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render('index', {text: jsonName.name})

    if (!jsonName) {
        res.status(400).json("Error: there is no value");
        return;
    }
})

app.listen(port)
