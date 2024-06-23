const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
  },
});

// 驗證密碼
userSchema.methods.comparePassword = async function (password, callback) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return callback(null, result);
  } catch (e) {
    return callback(e, result);
  }
};

// 在儲存用戶之前使用此middleware，如果是新用戶或者用戶的密碼被修改，則對密碼進行hash
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified) {
    const hashValue = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hashValue;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
