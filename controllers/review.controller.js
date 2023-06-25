const { reviewAddService, getById, update, gets, remove, getsProductFilter } = require('../services/review.service');

const addReview = async (req, res) => {
    try {
        const { productId, rating, reviewText } = req.body;

        if (!productId || !rating || !reviewText) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Generate a unique review ID
        const reviewId = Date.now().toString();

        // Create the review object
        const newReview = { reviewId, productId, rating, reviewText };
        console.log(newReview)

        const review = await reviewAddService(newReview);
        res.status(200).json({
            message: "New Review Added Successfully",
            review: review
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const getReviews = async (req, res) => {
    try {
        const reviews = await gets(req.body);
        res.json({ reviews });
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        res.status(500).json({ error: 'Error retrieving reviews' });
    }
}

const getsById = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log(productId)

        const productReviews = await getById({ productId });

        res.json({ reviews: productReviews });
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        res.status(500).send('Error retrieving reviews');
    }
}

const updateById = async (req, res) => {
    try {
        const id = req.params.id;
        const options = { new: true };

        const updatedReview = await update(id, req.body, options);

        if (!updatedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.json({ review: updatedReview });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ error: 'Error updating review' });
    }
}

const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedReview = await remove(id);
        if (!deletedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json({
            message: "Review delete successful",
            deletedReview
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}



module.exports = { addReview, getReviews, getsById, updateById, deleteById, }