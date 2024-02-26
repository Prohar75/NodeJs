import mongooseModel from "../db/schemas/notesSchema.js";

export async function getAllNotes(req, res) {
  await mongooseModel
    .find({isDeleted: false})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      if (err instanceof SyntaxError) {
        console.error("Error:", err.message);
        res.send("Error: Wrong type of data, cannot get.");
      } else {
        console.error("Error updating note:", err.message);
        res.send("Error: Something went wrong with getting all the data.");
      }
    });
}

export async function createNote(req, res) {
  const createOneNote = {
    title: req.body.title,
    content: req.body.content,
    Date: Date.now(),
    updateAt: "",
  };

  await mongooseModel
    .create(createOneNote)
    .then((createdData) => {
      res.send(createdData);
    })
    .catch((err) => {
      if (err instanceof SyntaxError) {
        console.error("Error:", err.message);
        res.send("Error: Wrong type of data, cannot post.");
      } else {
        console.error("Error:", err.message);
        res.send("Error: Something went wrong, couldn't post the data.");
      }
    });
}

export async function updateNote(req, res) {
  const updateId = req.params.id;
  const updateOneNote = {
    title: req.body.title,
    content: req.body.content,
    date: Date.now(),
  };

  await mongooseModel
    .findOneAndUpdate({ _id: updateId }, { $set: updateOneNote }, { new: true })
    .exec()
    .then((data) => {
      if (data === null) {
        res.send("nothing found");
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      if (err instanceof SyntaxError) {
        console.error("Error:", err.message);
        res.send("Error: Wrong type of data, cannot put.");
      } else {
        console.error("Error updating note:", err.message);
        res.send(
          "Error: Something went wrong, couldn't putting up a new data."
        );
      }
    });
}

export async function deleteNote(req, res) {
  const deleteId = req.params.id;
  const deleted = true;

  await mongooseModel
    .findOneAndUpdate({ _id: deleteId }, { $set: {isDeleted: deleted} }, { new: true })
    .exec()
    .then((data) => {
      if (data === null) {
        res.send("nothing found");
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      if (err instanceof SyntaxError) {
        console.error("Error:", err.message);
        res.send("Error: Wrong type of data, cannot delete.");
      } else {
        console.error("Error updating note:", err.message);
        res.send("Error: Something went wrong, couldn't delete the data.");
      }
    });
}