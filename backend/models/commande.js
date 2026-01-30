import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CommandeSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // référence au modèle User
    required: true
  },
  boutiqueId: {
    type: Schema.Types.ObjectId,
    ref: 'Boutique', // référence au modèle Boutique
    required: true
  },
  produits: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Produit', // référence au modèle Produit
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['en_attente', 'validee', 'livree'],
    default: 'en_attente'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'mobile_money', 'carte'],
    required: true
  },
 },
 {
    timestamps: true,
 }
);

export default model('Commande', CommandeSchema);