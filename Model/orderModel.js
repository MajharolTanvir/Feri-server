const mongoose = require('mongoose');

const orderShema = new mongoose.Schema({
      shippingInfo: {
            address: {
              type: String,
              required: true,
            },
            city: {
              type: String,
              required: true,
            },
            pinCode: {
              type: Number || String,
              required: true,
            },
            phone: {
              type: Number || String,
              required: true,
            },
          },
          orderItems: [
            {
              name: {
                type: String,
                required: true,
              },
              price: {
                type: Number,
                required: true,
              },
              quantity: {
                type: Number,
                required: true,
              },
              totalPrice: {
                type: Number,
                required: true,
              },
              image: {
                type: String,
                required: true,
              },
              product: {
                type: mongoose.Schema.ObjectId,
                ref: "Proudcts",
                required: true,
              },
            },
          ],
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
          paymentInfo: {
            paymentMethod: {
              type: String ,
              default: "Case On delivary"
            },
            transitionID: {
              type: String || Number,
              default: "No Payment"
            },
            status: {
              type: String,
              default: "No Payment"
            },
          },
       
          subTotalPrice: {
            type: Number,
            required: true,
            default: 0,
          },
          discount: {
            type: Number,
            required: true,
            default: 0,
          },
          shippingPrice: {
            type: Number,
            required: true,
            default: 0,
          },
          totalPrice: {
            type: Number | String,
            // required: true,
            default: 0,
          },
          orderStatus: {
            type: String,
            required: true,
            default: "Processing",
          },
          deliveredAt: Date,
          createdAt: {
            type: Date,
            default: Date.now,
          },
})


const orderModal = new mongoose.model("Order", orderShema)

module.exports = orderModal