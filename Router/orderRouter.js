const express = require("express");
const {
  productOrder,
  getAllOrder,
  getOrderDetails,
  orderDelete,
  orderUpdate,
  myOrder,
} = require("../Controler/orderControler");
const router = express.Router();

router.post("/:id", productOrder);
router.get("/", getAllOrder);
router.get("/:id", getOrderDetails);
router.delete("/:id", orderDelete);
router.put("/update/:id", orderUpdate);
router.get("/myOrder/:id", myOrder);

module.exports = router;
