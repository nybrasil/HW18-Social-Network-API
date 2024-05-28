const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// Route to get all users
router.route('/').get(getUsers).post(createUser);

// Route to get, update, delete a user by ID
router.route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Route to add and remove a friend
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;



