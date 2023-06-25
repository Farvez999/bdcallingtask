const express = require('express');
const { addProduct, getProducts, getProductsById, updateProductById, deleteProductById ,productFilter,productSearch} = require('../controllers/product.controller');
const router = express.Router();
const cors = require('cors');
const app = express();
const verifyAccessToken = require('../middleware/user.middleware');
const Product = require('../models/product.model');

// Middleware
app.use(express.json());
app.use(cors());

router.post('/add', verifyAccessToken, addProduct);

router.get('/products', getProducts);

router.get("/:id", getProductsById);

router.patch("/update/:id", updateProductById);

router.delete("/delete/:id", deleteProductById);

router.get('/products/search',productFilter);


module.exports = router;