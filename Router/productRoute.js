const express = require("express");
const { uplodeProduct, getAllProduct, updateProduct, deleteProduct, getProductDetails, addProductReview, addOfferToPrice, getofferProudct, deletedOfferByProduct } = require("../Controler/ProductControler");
const router = express.Router();

router.post("/uplode", uplodeProduct);
router.get("/product" , getAllProduct)
router.put("/update/:id" ,updateProduct)
router.delete("/delete/:id" , deleteProduct)
router.get("/details/:id" , getProductDetails)
router.put("/addReview/:id" , addProductReview)
router.post("/offer/:id" , addOfferToPrice)
router.get("/offer" , getofferProudct)
router.delete("/offer" , deletedOfferByProduct)
module.exports = router;
