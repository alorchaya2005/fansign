import mongoose, { Schema } from "mongoose";

const billingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["crypto", "stripe"],
    },
    status: {
      type: String,
      enum: ["completed", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Billing = mongoose.model("Billing", billingSchema);
