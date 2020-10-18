const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  cashBalance: {
    type: Number,
    required: false
  }
});

// export model user with UserSchema
module.exports = mongoose.model("User", UserSchema);
