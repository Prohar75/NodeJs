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
};

export default userController;
