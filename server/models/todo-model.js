const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment-timezone");

const todoSchema = new Schema({
  check: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
    maxlength: 50,
    required: true,
  },
  todoID: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updateDate: { type: Number, required: true },
  date: {
    type: String,
    default: () => moment().tz("Asia/Taipei").format("YYYY-MM-DD"),
  },
});

module.exports = mongoose.model("Todo", todoSchema);
