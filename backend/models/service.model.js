import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    revisions: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      enum: ["notes", "selection"],
      default: "notes",
    },

    selection: [
      {
        option: {
          type: String,
        },
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    customFields: [
      {
        label: String,
        fieldType: {
          type: String,
          enum: ["dropdown", "checkbox", "radio", "text"],
        },
        required: Boolean,
        options: [
          {
            value: String,
            extraPrice: Number,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
