const User = require("../models/user.model");

exports.createUser = async (userInfo) => {
    const user = await User.create(userInfo);
    return user;
}

exports.gets = async (document) => {
    try {
        const users = await User.find(document);
        return users
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.findOne = async (query) => {
    try {
        const user = await User.findOne(query);
        return user;
    }
    catch (err) {
        console.log(err.message);
        throw new Error(err.message.split(":")[2]);
    }
}



exports.getById = async (id) => {
    try {
        const user = await User.findById(id);
        return user
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.update = async (id, document, options) => {
    try {
        const update = await User.findByIdAndUpdate(id, document, options);
        return update
    }
    catch (err) {
        console.log(err);
        if (err.code === 11000) {
            if (err.keyValue?.name) {
                throw new Error("Name already exist");
            }
            if (err.keyValue?.email) {
                throw new Error("Email already exist");
            }
        }
        else {
            throw new Error(err.message.split(":")[2]);
        }
    }
}

exports.remove = async (id) => {
    try {
        const user = await User.findByIdAndDelete(id);
        return user
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message.split(":")[2]);

    }
}