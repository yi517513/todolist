const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment-timezone");
const { func } = require("joi");

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 10,
  },
  description: {
    type: String,
    maxlength: 50,
  },
  date: {
    type: String,
  },
  date_: {
    type: Date,
    default: Date.now,
  },
});

todoSchema.pre("save", function (next) {
  if (!this.date) {
    this.date = moment().format("YYYY-MM-DD");
  } else {
    this.date = moment(this.date).format("YYYY-MM-DD");
  }
  next();
});

module.exports = mongoose.model("Todo", todoSchema);
