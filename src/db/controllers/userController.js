import mongooseModel from "../schemas/notesSchema.js";

const userController = {
  get_name: async (req, res) => {
    try {
      const name = req.query.name;
      if (name) {
        res.send(`hello ${name}`);
      } else {
        throw new Error("there is no value");
      }
    } catch (err) {
      console.log(err);
    }
  },

  get_all: async (req, res) => {
    await mongooseModel
      .find({})
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.error("Error updating note:", err.message);
        res.send("Internal Server Error");
      });
  },

  post: async (req, res) => {
    let createTitle = req.body.title;
    let createContent = req.body.content;
    let createDate = Date.now();

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
        console.error("Error:", err.message);
        res.send("Internal Server Error");
      });
  },

  put: async (req, res) => {
    const updateId = req.params.id;
    const updateTitle = req.body.title;
    const updateContent = req.body.content;
    const updateDate = Date.now();

    await mongooseModel
      .findOneAndUpdate(
        { _id: updateId },
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
        res.send("Internal Server Error");
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
        console.error("Error deleting note:", err.message);
        res.send("Internal Server Error");
      });
  },
};

export default userController;
