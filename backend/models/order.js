const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;
 
const CartItemSchema = new Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    name: {},
    price: Number,
    count: Number
  },
  { timestamps: true }
);
 
const CartItem = mongoose.model("CartItem", CartItemSchema);
 
const OrderSchema = new Schema(
  {
    products: [CartItemSchema],
    name: {},
    transaction_id: {},
    amount: { type: Number },
    sold:{type: Number},
    address: {},
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
    },
    updated: Date,
    user1:{type:String,required:true},
    artistid:{type:String,required:true}
   
  },
  { timestamps: true }
);
 
const Order = mongoose.model("Order", OrderSchema);
 
module.exports = { Order, CartItem };