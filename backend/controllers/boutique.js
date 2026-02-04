import User from "../models/user.js";
import Boutique from "../models/boutique.js";
import Produit from "../models/produit.js";
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

export const createProduit = async (req, res) => {
  try {

    // récupérer l'utilisateur connecté
    const userId = req.user.userId;

    // trouver SA boutique
    const boutique = await Boutique.findOne({ owner: userId });

    if (!boutique) {
      return res.status(404).json({
        message: "Vous devez créer une boutique avant d'ajouter un produit",
      });
    }

    const {
      name,
      description,
      price,
      stock,
      category,
    } = req.body;

    // Validation simple (optionnel mais recommandé)
    if (!name || !price || !stock) {
      return res.status(400).json({
        message: "Nom, prix et stock sont obligatoires",
      });
    }

    // Gestion image
    let imageData = { url: "", public_id: "" };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "produits", 
      });

      imageData = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Création produit
    const produit = await Produit.create({
      name,
      description,
      price,
      stock,
      category,
      imageProduit: imageData,
      boutiqueId: boutique._id, //sécurisé
    });

    res.status(201).json({
      message: "Produit créé avec succès",
      produit,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const updateProduit = async (req, res) => {
  try {

    const userId = req.user.userId;
    const { id } = req.params; // id du produit

    // Trouver le produit
    const produit = await Produit.findById(id);

    if (!produit) {
      return res.status(404).json({
        message: "Produit introuvable",
      });
    }

    // Vérifier que la boutique appartient au user
    const boutique = await Boutique.findOne({
      _id: produit.boutiqueId,
      owner: userId,
    });

    if (!boutique) {
      return res.status(403).json({
        message: "Non autorisé à modifier ce produit",
      });
    }

    // Champs autorisés
    const allowedFields = [
      "name",
      "description",
      "price",
      "stock",
      "category",
      "isActive",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Gestion PRO de l'image
    if (req.file) {

      // supprimer ancienne image
      if (produit.imageProduit?.public_id) {
        await cloudinary.uploader.destroy(
          produit.imageProduit.public_id
        );
      }

      // upload nouvelle image
      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "produits",
        }
      );

      updates.imageProduit = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Update
    const updatedProduit = await Produit.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    res.status(200).json({
      message: "Produit modifié avec succès",
      produit: updatedProduit,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProduit = async (req, res) => {
  try {

    const userId = req.user.userId;
    const { id } = req.params;

    // vérifier produit
    const produit = await Produit.findById(id);

    if (!produit) {
      return res.status(404).json({
        message: "Produit introuvable",
      });
    }

    // vérifier owner boutique
    const boutique = await Boutique.findOne({
      _id: produit.boutiqueId,
      owner: userId,
    });

    if (!boutique) {
      return res.status(403).json({
        message: "Non autorisé à supprimer ce produit",
      });
    }

    // supprimer image Cloudinary
    if (produit.imageProduit?.public_id) {
      await cloudinary.uploader.destroy(
        produit.imageProduit.public_id
      );
    }

    // supprimer produit
    await produit.deleteOne();

    res.status(200).json({
      message: "Produit supprimé avec succès",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};