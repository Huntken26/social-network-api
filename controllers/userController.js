const { User, Thought } = require("../models");
//Utilized/customized the controllers file from the class activity- 28-mini-project U of M


module.exports = {
   // Get all users
    getUsers(req, res) {
        User.find()
          .then((userdata) => res.json(userdata))
          .catch((err) => res.status(500).json(err));
      },
    // Get a single student
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then(async (userdata) =>
          !userdata
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json( userdata )
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // Delete a user 
    deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No such user exists' })
            : User.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
              )
        )
        .then((user) =>
          !user
            ? res.status(404).json({
                message: 'User deleted, but there is a 404 error',
              })
            : res.json({ message: 'Student successfully deleted' })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // Add an assignment to a user
    addFriend(req, res) {
      console.log('You are adding a friend to this user');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      )
        .then((userdata) =>
          !userdata
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(userdata)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove assignment from a student
    removeFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  };
  