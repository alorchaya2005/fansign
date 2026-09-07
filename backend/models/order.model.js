import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    selection: {
      type: String,
    },
    addOns: [
      {
        label: String,
        options: [
          {
            type: String,
          },
        ],
      },
    ],
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
