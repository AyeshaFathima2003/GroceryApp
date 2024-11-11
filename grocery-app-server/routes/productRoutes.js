const express = require('express');

const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken');
const {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct,searchProducts,addProductReview, getProductReviews,filterProducts, getTopRatedProducts} = require('../controller/productController');
// Get all products

router.get('/allproducts', getAllProducts);
router.get('/productid',getProductById)
router.post('/createproduct',createProduct);
router.post('/deleteproduct', deleteProduct);
router.post('/searchproduct', searchProducts);
router.post('/addproductreview', addProductReview);
router.post('/getproductreview', getProductReviews);
router.post('/filterproduct', filterProducts);
router.post('/gettopratedproducts', getTopRatedProducts);


module.exports = router;
