import User from "../models/user.js";
import Boutique from "../models/boutique.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

export const updateBoutique = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ récupérer la boutique
    const boutique = await Boutique.findById(id);
    if (!boutique) {
      return res.status(404).json({ message: "Boutique introuvable" });
    }

    // 2️⃣ Vérifier que l'utilisateur connecté est le propriétaire
    if (boutique.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    // 3️⃣ Champs autorisés
    const allowedFields = [
      "name_shop",
      "description",
      "phone",
      "openingDays",
      "openingHour",
      "closingHour",
      "facebook",
      "instagram",
      "website",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    // 4️⃣ Gestion du logo
    if (req.file) {
      // upload avec overwrite si logo existe déjà
      // définir le public_id pour overwrite
        const publicId = boutique.logo?.public_id
            ? boutique.logo.public_id.split('/').pop() // garder juste le nom du fichier
            : Date.now().toString();

        const result = await cloudinary.uploader.upload(req.file.path, {
            public_id: publicId,  // juste le nom du fichier
            folder: "boutiques",  // dossier unique
            overwrite: true,
        });

        updates.logo = {
            url: result.secure_url,
            public_id: result.public_id,
        };
    }

    // 5️⃣ Mettre à jour la boutique
    const updatedBoutique = await Boutique.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.status(200).json({
      message: "Boutique modifiée avec succès",
      boutique: updatedBoutique,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};