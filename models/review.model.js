const { default: mongoose } = require('mongoose');

const reviewSchema = mongoose.Schema({
    productId: {
        type: String,
        required: [true, "Product Id is required"],
        unique: true
    },
    rating: {
        type: String,
        required: [true, "Product Rating is required"],
    },
    reviewText : {
        type: String,
        required: [true, "Product Review Text is required"],
    },
}, {
    timestamps: true
})


const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;