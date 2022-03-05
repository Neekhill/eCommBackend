const mogoose = require("mongoose");
const Schema = mogoose.Schema;

const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true },
    birthday: { type: Date },
    shippingaddress: { type: String },
    billingaddress: { type: String },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // this will created at, updated at timestamps
);

module.exports = userSchema;
