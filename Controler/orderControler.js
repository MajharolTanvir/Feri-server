const OrderDB = require("../Model/orderModel");
const ProductDB = require("../Model/productModel");

exports.productOrder = async (req, res, next) => {
  try {
    const d = new Date();
    const jastDate =
      d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      subTotalPrice,
      discount,
      shippingPrice,
      totalPrice,
    } = req.body;
    console.log(req.body);
    const order = await OrderDB.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      subTotalPrice,
      shippingPrice,
      totalPrice,
      discount,
      paidAt: jastDate,
      user: req.params.id,
    });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllOrder = async (req, res, next) => {
  const order = await OrderDB.find({});
  res.json({ success: true, order });
};

exports.getOrderDetails = async (req, res, next) => {
  const order = await OrderDB.findById(req.params.id);
  if (!order) {
    res.status(404).json({ success: false, message: "Order Not found" });
  }
  res.json({ success: true, order });
};

exports.orderDelete = async (req, res, next) => {
  try {
    const order = await OrderDB.findById(req.params.id);
    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order Not found!",
      });
    }
    order.remove();
    res.status(200).json({
      success: true,
      message: "Order Delete Successfull",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.orderUpdate = async (req, res, next) => {
  try {
    const order = await OrderDB.findById(req.params.id);
    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order Not found!",
      });
    }
    if (order.orderStatus === "Delivered") {
      res.status(400).json({
        success: false,
        message: "You Have All Ready Delivered This Order.",
      });
    }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

async function updateStock(id, quantity) {
  try {
    const product = await ProductDB.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
  } catch (error) {}
}

exports.myOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await OrderDB.find({ user: id }).populate(
      "user",
      "name email"
    );
    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order Not found!",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};


