const express = require('express');

const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken');
const {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct,searchProducts,addProductReview, getProductReviews,filterProducts, getTopRatedProducts} = require('../controller/productController');
// Get all products

router.get('/allproducts', getAllProducts);
router.get('/productid',getProductById)
router.post('/createproduct',createProduct);
router.put('/updateproduct', updateProduct);
router.delete('/deleteproduct', deleteProduct);
router.get('/searchproduct', searchProducts);
router.post('/addproductreview', addProductReview);
router.get('/getproductreview', getProductReviews);
router.post('/filterproduct', filterProducts);
router.get('/gettopratedproducts', getTopRatedProducts);


module.exports = router;
