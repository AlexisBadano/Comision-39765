import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    password: String,
    cart: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Cart",
    },
    role: {
      type: String,
      default: "user",
    },
    bio: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const userModel = mongoose.model(collection, schema);

export default userModel;
