import mongooseModel from "../db/schemas/notesSchema.js";

const notesController = {
  get_all: async (req, res) => {
    await mongooseModel
      .find({})
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
  },

  post: async (req, res) => {
    const createTitle = req.body.title;
    const createContent = req.body.content;
    const createDate = Date.now();

    await mongooseModel
      .create({
        title: createTitle,
        content: createContent,
        createAt: createDate,
        updateAt: "",
      })
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
  },

  put: async (req, res) => {
    const updateId = req.params.id;
    const updateNote = {
      title: req.body.title,
      content: req.body.content,
      date: Date.now(),
    };

    await mongooseModel
      .findOneAndUpdate({ _id: updateId }, { $set: updateNote }, { new: true })
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
  },

  delete: async (req, res) => {
    const deleteId = req.params.id;

    await mongooseModel
      .findOneAndDelete({ _id: deleteId })
      .exec()
      .then((docs) => {
        if (docs === null) {
          res.send({ success: false, message: "note not found" });
        } else {
          res.send({ success: true, id: docs.id });
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
  },
};

export default notesController;
