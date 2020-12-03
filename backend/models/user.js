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
  animal: {
    type: String,
    required: true,
    default: "Bear"
  },
  animalName: {
    type: String,
    required: true,
    default: "Benny"
  },
  happiness: {
    type: String,
    required: true,
    default: "40"
  }
});

// export model user with UserSchema
module.exports = mongoose.model("User", UserSchema);
