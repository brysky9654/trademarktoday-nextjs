const mongoose = require("mongoose");

const keywordsSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
},
  { timestamps: false }
);

const keywordsModel = mongoose.model.keywords || mongoose.model("keywords", keywordsSchema);
export default keywordsModel;
