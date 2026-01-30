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

    /**
     * Mot de passe hashé (bcrypt)
     * ⚠️ Ne jamais stocker le mot de passe en clair
     */
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // ne pas retourner le password par défaut
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

    /**
     * Référence de la boutique
     * Utilisé uniquement si role === "boutique"
     */
    boutiqueId: {
      type: Schema.Types.ObjectId,
      ref: "Boutique",
      default: null,
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