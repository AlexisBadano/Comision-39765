import mongoose from "mongoose";

const collection = "Products"

const schema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    code: Number,
    category: {
        type: String,
        enum: ['Monitor', 'PC', 'Notebook', 'Perifericos', 'Storage', 'Otro'],
        default: 'Otro',
    },
    stock: Number,
    thumbnails: [],
},
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } } )

const productModel = mongoose.model(collection, schema)

export default productModel;