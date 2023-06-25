const Review = require("../models/review.model");


exports.reviewAddService = async (newReview) => {
    console.log(newReview);
    const review = await Review.create(newReview);
    return review;
}

exports.gets = async (document) => {
    try {
        const reviews = await Review.find(document);
        return reviews
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.getById = async (id) => {
    try {
        const review = await Review.find(id);
        return review
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.update = async (id, document, options) => {
    try {
        const update = await Review.findByIdAndUpdate(id, document, options);
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
        const review = await Review.findByIdAndDelete(id);
        return review
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message.split(":")[2]);

    }
}

exports.getsProductFilter = async (document) => {
    try {
        const products = await Product.find(document);
        return products
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}