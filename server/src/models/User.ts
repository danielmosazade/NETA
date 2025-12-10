import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  cart: ICartItem[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
  cart: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: false },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

export const User = mongoose.model<IUser>("User", UserSchema);
