import User from "../models/user.js";
import Boutique from "../models/boutique.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    // récupérer la client
    const client = await User.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // Champs autorisés
    const allowedFields = [
      "name",
      "phone",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    // Gestion de l'image
    if (req.file) {
      // upload avec overwrite si image existe déjà
      // définir le public_id pour overwrite
        const publicId = client.image?.public_id
            ? client.image.public_id.split('/').pop() // garder juste le nom du fichier
            : Date.now().toString();

        const result = await cloudinary.uploader.upload(req.file.path, {
            public_id: publicId,  // juste le nom du fichier
            folder: "users",  // dossier unique
            overwrite: true,
        });

        updates.image = {
            url: result.secure_url,
            public_id: result.public_id,
        };
    }

    // Mettre à jour l'utilisateur
    const updatedClient = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.status(200).json({
      message: "Client modifiée avec succès",
      client: updatedClient,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};