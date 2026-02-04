import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    /**
     * Nom complet de l'utilisateur
     */
    name: {
      type: String,
      required: true,
      trim: true, //supprime les espaces avant et après les strings.
    },

    /**
     * Adresse email
     * - unique : un seul compte par email
     * - lowercase : évite les doublons Email/EMAIL
     */
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // ne pas retourner le password par défaut
    },

    // CIN si role = boutique 
    cin: {
      type: String,
      trim: true,
    },
    // image de l'utilisateur
    // image: {
    //     type: String, // URL ou chemin du fichier image
    //     default: ''
    // },
    image: {
      url: { type: String, default: "" },       // URL de l’image
      public_id: { type: String, default: "" }, // public_id Cloudinary
    },
    /**
     * Rôle de l'utilisateur
     * - admin    : gestion globale
     * - boutique : gestion d'une boutique
     * - client   : simple utilisateur
     */
    role: {
      type: String,
      enum: ["admin", "boutique", "client"],
      default: "client",
    },

    /**
     * Numéro de téléphone
     */
    phone: {
      type: String,
      trim: true,
    },

    /**
     * Statut du compte
     * false = compte désactivé
     */
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    /**
     * Ajoute automatiquement :
     * - createdAt
     * - updatedAt
     */
    timestamps: true,
  }
);

export default model('User', UserSchema);