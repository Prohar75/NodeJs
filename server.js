import express from "express";
import bodyParser from "body-parser";
import mongoose, { ObjectId } from "mongoose";
const app = express();
const PORT = 3001;
const connectionString =
  "mongodb+srv://Prohar:PEA16april2005@cluster0.bosgtkc.mongodb.net/?retryWrites=true&w=majority";

const URL = {
  GREETINGS: "/api/greetings",
  NOTES: "/api/notes",
};

app.use(express.json());

// DB CONNECTION
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// SCHEMA
const schema = {
  id: Number,
  title: String,
  content: String,
  createAt: Date,
  updateAt: Date,
};
const mongooseModel = mongoose.model("NEWCOL", schema);

//GET
app.get(URL.NOTES, async (req, res) => {
  res.send({});
});

// POST
app.post(URL.NOTES, async (req, res) => {
  console.log("inside post function");

  const data = new mongooseModel({
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    createAt: Date.now(),
    updateAt: "",
  });

  const val = await data.save();
  res.send(data);
});

// PUT
app.put(URL.NOTES + "/:id", async (req, res) => {
  let updateId = req.params.id;
  let updateTitle = req.body.title;
  let updateContent = req.body.content;
  let updateDate = Date.now();

  mongooseModel
    .findOneAndUpdate(
      { id: updateId },
      {
        $set: {
          title: updateTitle,
          content: updateContent,
          updateAt: updateDate,
        },
      },
      { new: true }
    )
    .exec()
    .then((data) => {
      if (data === null) {
        res.send("nothing found");
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      console.error("Error updating note:", err.message);
      // Handle the error
      res.status(500).send("Internal Server Error");
    });
});

// DELETE

app.delete(URL.NOTES + "/:id", async (req, res) => {
  let deleteId = req.params.id;

  mongooseModel.findOneAndDelete({ id: deleteId })
    .exec()
    .then(docs => {
      if (docs === null) {
        res.send({ success: false, message: "note not found" });
      } else {
        res.send({ success: true, id: docs.id });
      }
    })
    .catch(err => {
      console.error('Error deleting note:', err.message);
      // Handle the error
      res.status(500).send('Internal Server Error');
    });
});



app.listen(PORT);

console.log(
  `\n--------------------
      \nStarteed at port: ${PORT}
      \nHere is your link: http://localhost:${PORT}/
      \n--------------------`
);
