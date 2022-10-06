const express = require("express");
const { uplodeProduct, getAllProduct, updateProduct, deleteProduct, getProductDetails, addProductReview } = require("../Controler/ProductControler");
const router = express.Router();

router.post("/uplode", uplodeProduct);
router.get("/product" , getAllProduct)
router.put("/update/:id" ,updateProduct)
router.delete("/delete/:id" , deleteProduct)
router.get("/details/:id" , getProductDetails)
router.put("/addReview/:id" , addProductReview)
module.exports = router;
