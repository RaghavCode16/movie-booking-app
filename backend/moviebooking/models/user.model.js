const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userid: Number,
  email: String,
  first_name: String,
  last_name: String,
  username: String,
  contact_number: String,
  password: String,
  role: String,
  isLoggedIn: Boolean,
  uuid: String,
  accesstoken: String,
  coupons: [
    {
      id: Number,
      discountValue: Number,
    },
  ],
  bookingRequests: [
    {
      reference_number: Number,
      coupon_code: Number,
      show_id: Number,
      tickets: [Number],
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
