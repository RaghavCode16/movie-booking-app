const User = require("../models/user.model");

const TokenGenerator = require("uuid-token-generator");
const { v4: uuid } = require("uuid");

function btoa(str) {
  return Buffer.from(str, "binary").toString("base64");
}

let activeUsers = {};

exports.create = async (req, res) => {
  console.log("Signup request received", req.body);
  try {
    const { email, first_name, last_name, contact_number, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    const user = new User({
      uuid: uuid(),
      email,
      first_name,
      last_name,
      contact_number,
      password,
      role: "user",
      isLoggedIn: false,
    });

    //temporary
    console.log("Prepared user data before saving:", user);

    await user.save();
    res.status(201).json({ message: "User successfully registered." });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.login = async (req, res) => {
  try {
    const encoded = req.headers.authorization?.split(" ")[1];
    const decoded = Buffer.from(encoded, "base64").toString("ascii");
    const [email, password] = decoded.split(":");

    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = new TokenGenerator().generate();

    user.isLoggedIn = true;
    await user.save();

    activeUsers[user.uuid] = token;

    res.status(200).json({
      id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      accessToken: token,
      uuid: user.uuid,
      isLoggedIn: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.logout = async (req, res) => {
  try {
    const uuid = req.headers.uuid;

    if (!uuid || !activeUsers[uuid])
      return res.status(401).json({ message: "User not logged in." });

    await User.updateOne({ uuid }, { isLoggedIn: false });

    delete activeUsers[uuid];

    res.status(200).json({ message: "User successfully logged out." });
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getCouponCode = async (req, res) => {
  try {
    const uuid = req.headers.uuid;

    if (!uuid) {
      return res.status(400).json({ message: "UUID not provided in headers." });
    }

    const user = await User.findOne({ uuid });

    if (!user || !user.isLoggedIn) {
      return res.status(401).json({ message: "User not logged in." });
    }

    return res.status(200).json({ coupons: user.coupons || [] });
  } catch (err) {
    console.error("Get Coupon Error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.bookShow = async (req, res) => {
  try {
    const uuid = req.headers.uuid;
    const { show_id, coupon_code, tickets } = req.body;

    if (!uuid) {
      return res.status(400).json({ message: "UUID is required in headers." });
    }

    const user = await User.findOne({ uuid });

    if (!user || !user.isLoggedIn) {
      return res.status(401).json({ message: "User not logged in." });
    }

    // Create booking request
    const bookingRequest = {
      reference_number: Math.floor(100000 + Math.random() * 900000), // 6-digit ref no.
      coupon_code,
      show_id,
      tickets,
    };

    if (!user.bookingRequests) {
      user.bookingRequests = [];
    }

    user.bookingRequests.push(bookingRequest);
    await user.save();

    res.status(200).json({
      message: "Show successfully booked.",
      booking: bookingRequest,
    });
  } catch (err) {
    console.error("Book Show Error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};
