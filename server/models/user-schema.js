const mongoose = require("mongoose");
const user_schema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"] },

    password: { type: String, required: [true, "Pass is required"] },
   
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", user_schema);
module.exports = UserModel;
