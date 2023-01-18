//Utilized the api routes from the mini project and customized for the social media routes
const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getSingleUser).delete(deleteUser);

router.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;