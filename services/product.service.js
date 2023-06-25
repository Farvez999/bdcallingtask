const Product = require("../models/product.model");

exports.productAddService = async (leadInfo) => {
    console.log(leadInfo);
    const product = await Product.create(leadInfo);
    return product;
}

exports.getsProduct = async (document) => {
    try {
        const products = await Product.find(document);
        return products
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.getById = async (id) => {
    try {
        const product = await Product.findById(id);
        return product
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.update = async (id, document, options) => {
    try {
        const update = await Product.findByIdAndUpdate(id, document, options);
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
        const product = await Product.findByIdAndDelete(id);
        return product
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
