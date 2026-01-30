import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProduitSchema = new Schema(
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
       price: {
            type: Number,
            required: true,
            min: 0
       },
       stock: {
            type: Number,
            required: true,
            min: 0
       },
       image: {
           type: String, // URL ou chemin du fichier image
           default: ''
       },
       boutiqueId: {
           type: Schema.Types.ObjectId,
           ref: "Boutique",
           required: true
       },
       category: {
           type: String,
           default: '',
           trim: true
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

export default model('Produit', ProduitSchema);