// models/DeliveryMan.js
import mongoose from "mongoose";

const deliveryManSchema = new mongoose.Schema({
  name: String,
  available: { type: Boolean, default: true },
});

export default mongoose.models.DeliveryMan ||
  mongoose.model("DeliveryMan", deliveryManSchema);
