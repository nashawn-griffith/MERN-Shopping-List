const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {type: String, required: true, trim: true},
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      //unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {type: String, required: true, trim: true}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('user', userSchema);
