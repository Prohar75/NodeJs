const express = require("express")
const fs = require("fs")
const app = express()
const port = 3000;
const filePath = "api/greetings.json"

let jsonName

fs.readFile(filePath, 'utf-8', (err, data) => {
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
