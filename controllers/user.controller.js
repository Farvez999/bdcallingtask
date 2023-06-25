const { createUser, gets, findOne, getById,update,remove } = require('../services/user.service')

const addUser = async (req, res) => {
    try {
        const document = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        console.log(document)
        const newUser = await createUser(req.body);

        res.status(201).json({
            message: "New User Created Successful",
            user: newUser
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const query = req.query;
        const users = await gets(query);
        res.status(200).json({
            users
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || email === null) {
            return res.status(400).json({ message: "Email is required" });
        }

        if (!password || password === null) {
            return res.status(400).json({ message: "Password is required" });
        }

        const query = { email: email };
        const user = await findOne(query);
        if (!user) {
            return res.status(404).json({ message: "This email is not found!" });
        }
        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Password is incorrect!" });
        }

        const accessToken = await user.createJWT();

        res.json({
            message: "User login successful",
            user: user,
            accessToken
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }
}

const getLoggedUser = async (req, res) => {
    try {
        const user = req.user;

        res.status(200).json({
            user: user
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getById(id);
        res.status(200).json({
            user
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const exist = await getById(id);
        if (!exist) {
            return res.status(404).json({
                message: "No user found!",
            })
        }

        const document = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        };
        const options = { new: true };

        const user = await update(id, document, options);
        res.status(200).json({
            message: "User update successful",
            user
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const exist = await getById(id);
        if (!exist) {
            return res.status(404).json({
                message: "No user found!",
            })
        }

        const user = await remove(id);
        res.status(200).json({
            message: "User delete successful",
            user
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = { addUser, getUsers, loginUser, getLoggedUser,getUserById, updateUserById, deleteUserById }