import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerName: String,
    customerPhone: String,
    items: [String],
    driverIndex: { type: Number, default: 0 },
    driverPhone: String,
    status: {
      type: String,
      enum: ["pending", "accepted", "failed"],
      default: "pending",
    },
    refusedBy: [String],
    acceptedBy: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
