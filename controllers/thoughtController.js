const { User, Thought } = require("../models");
//Utilized/customized the controllers file from the class activity- 28-mini-project U of M


module.exports = {
    getThoughts(req, res) {
        Thought.find()
          .then((thoughtdata) => res.json(thoughtdata))
          .catch((err) => res.status(500).json(err));
      },

      // Get a thought
    getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thoughtdata) =>
        !thoughtdata
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thoughtdata)
      )
      .catch((err) => res.status(500).json(err));
  },

   // Create a thought
   createThought(req, res) {
    Thought.create(req.body)
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.ThoughtId })
          .then((data) =>
            !data
              ? res.status(404).json({ message: 'No thought with that ID' })
              : Thought.deleteMany({ _id: { $in: thought.users } })
          )
          .then(() => res.json({ message: 'Thought deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
      // Update a thought
      updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((data) =>
            !data
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(data)
          )
          .catch((err) => res.status(500).json(err));
      },
    

























};