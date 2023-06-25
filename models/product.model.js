const { default: mongoose } = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product Title is required"],
    },
    img: {
        type: String,
        required: [true, "Product Image is required"],
        unique: true
    },
    price: {
        type: String,
        required: [true, "Product Price is required"],
    },
    description: {
        type: String
    },
}, {
    timestamps: true
})


const Product = mongoose.model("Product", productSchema);

module.exports = Product;