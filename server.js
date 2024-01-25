import express from "express";
import bodyParser from "body-parser";
import mongodb, { ObjectId } from "mongodb";
const app = express();
const PORT = 3001;
const dirname = "C:/Users/egorp/git-repositories/NodeJs/";
const connectionString =
  "mongodb+srv://Prohar:PEA16april2005@cluster0.bosgtkc.mongodb.net/?retryWrites=true&w=majority";

const URL = {
  GREETINGS: "/api/greetings",
  NOTES: "/api/notes",
};

mongodb.MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");

    const db = client.db("NodeJs-Task");
    const quotesCollection = db.collection("quotes");

    app.set("view engine", "ejs");

    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.get(URL.GREETINGS, function (req, res) {
      try {
        const name = req.query.name;

        if (name) {
          res.send(`hello ${name}`);
        } else {
          throw new Error("there is no value");
        }
      } catch (error) {
        console.log(error);
      }
    });

    app.get("/", (req, res) => {});

    app.get(URL.NOTES, (req, res) => {
      quotesCollection
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { quotes: results });
        })
        .catch(/* ... */);
    });

    // POST COMMAND

    app.post(URL.NOTES, (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect(URL.NOTES);
          console.log(result);
        })
        .catch((error) => console.error(error));
    });

    // UPDATE COMMAND
    app.put(URL.NOTES, (req, res) => {
      quotesCollection.updateOne(
        { name: req.body.find_name },
        { $set: { 
          name: req.body.replace_name,
          quote: req.body.replace_quote 
        }});
    });

    
    app.listen(PORT);

    console.log(
      `\n--------------------
      \nStarteed at port: ${PORT}
      \nHere is your link: http://localhost:${PORT}/
      \n--------------------`
    );
  })
  .catch((error) => console.error(error));

