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

// 驗證使用者輸入的密碼是否與資料庫的相同，兩個都是hash過的，更改成return promise
userSchema.methods.comparePassword = async function (password, callback) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (e) {
    throw new Error(e);
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
