import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BoutiqueSchema = new Schema(
  {
    name_shop: {
    type: String,
    required: true,
    trim: true
    },
    // logo: {
    //     type: String, // URL ou chemin du fichier image
    //     default: ''
    // },
    logo: {
      url: { type: String, default: "" },       // URL de l’image
      public_id: { type: String, default: "" }, // public_id Cloudinary
    },
    description: {
        type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    box: {
      type: String, // stand / box
      required: true,
    },
    // horaires
    openingDays: {
      type: [String], // ["Lundi","Mardi",...]
      required: true,
    },
    openingHour: {
      type: String, // "08:00"
      required: true,
    },
    closingHour: {
      type: String, // "18:00"
      required: true,
    },

    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User', // référence à ton modèle User
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
  },
  {
    timestamps: true,
  }
);

export default model('Boutique', BoutiqueSchema);