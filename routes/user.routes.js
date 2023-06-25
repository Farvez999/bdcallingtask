const express = require('express');
const { addUser, getUsers, loginUser, getLoggedUser, getUserById,updateUserById,deleteUserById} = require('../controllers/user.controller');
const router = express.Router();
const verifyAccessToken = require('../middleware/user.middleware')

router.post('/add', addUser);

router.get("/", getUsers);

router.get("/logged-user", getLoggedUser);

router.get("/:id", getUserById);

router.post("/login", loginUser)

router.put("/update/:id", updateUserById);

router.delete("/delete/:id", deleteUserById);

module.exports = router;