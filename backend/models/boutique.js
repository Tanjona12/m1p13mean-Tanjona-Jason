import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BoutiqueSchema = new Schema(
  {
    name: {
    type: String,
    required: true,
    trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    logo: {
        type: String, // URL ou chemin du fichier image
        default: ''
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