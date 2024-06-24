const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  data: {
    type: String,
    required: true,
    maxlength: 50,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
