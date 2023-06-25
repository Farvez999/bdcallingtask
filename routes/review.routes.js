const express = require('express');
const { addReview, getReviews, getsById, updateById, deleteById } = require('../controllers/review.controller');
const router = express.Router();
const cors = require('cors');
const app = express();
const Review = require('../models/review.model');

// Middleware
app.use(express.json());
app.use(cors());


router.post('/add', addReview);

router.get('/all', getReviews);

router.get("/:productId", getsById);

router.put("/update/:id", updateById);

router.delete("/delete/:id", deleteById);

// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deletedReview = await Review.findByIdAndDelete(id);

//         if (!deletedReview) {
//             return res.status(404).json({ error: 'Review not found' });
//         }

//         res.json({ message: 'Review deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting review:', error);
//         res.status(500).json({ error: 'Error deleting review' });
//     }
// });


module.exports = router;