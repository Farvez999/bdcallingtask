const { productAddService, getById, update, getsProduct, remove,getsProductFilter } = require('../services/product.service');

const addProduct = async (req, res) => {
    try {
        console.log(req.user);
        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'forbidden access' })
        }
        const product = await productAddService(req.body);
        res.status(200).json({
            message: "New Product Added Successfully",
            product: product
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const query = req.query;
        const products = await getsProduct(query);
        res.status(200).json({
            products
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const getProductsById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const product = await getById(id);
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const updateProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const options = { new: true };

        const product = await update(id, req.body, options);
        res.status(200).json({
            message: "Product update successful",
            product
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)

        const exist = await getById(id);
        if (!exist) {
            return res.status(404).json({
                message: "No user found!",
            })
        }

        const user = await remove(id);
        res.status(200).json({
            message: "Product delete successful",
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

const productFilter = async (req, res) => {

    try {
        const searchTerm = req.query;
    
        const products = await getsProductFilter(searchTerm );
    
        res.status(200).json({
          products
      })
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to perform product filter' });
      }
}


module.exports = { addProduct, getProducts, getProductsById, updateProductById, deleteProductById ,productFilter}