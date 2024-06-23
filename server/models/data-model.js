const mongoose = require("mongoose");
const { Schema } = mongoose;

const dataSchema = new Schema({
  data: {
    type: String,
    required: true,
    maxlength: 50,
  },
});

module.exports = mongoose.model("Data", dataSchema);
