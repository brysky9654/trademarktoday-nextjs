const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    class: {
        type: Number,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
},
    { timestamps: false }
);
const ProductsModel = mongoose.models.products || mongoose.model("products", productsSchema);8
export default ProductsModel;
