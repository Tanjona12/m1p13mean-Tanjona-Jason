import User from "../models/user.js";
import Boutique from "../models/boutique.js";
import Produit from "../models/produit.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";



/**
 * ADMIN - Ajouter un utilisateur propriétaire (role=boutique)
 */
export const createBoutiqueUser = async (req, res) => {
  try {

    const { name, phone, email, password, cin } = req.body;

    const existingUser = await User.findOne({
      $or: [
        { email: email },
        { cin: cin }
      ]
    });
    if (existingUser) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    let imageData = { url: "", public_id: "" };
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "users",
      });
      imageData = { url: result.secure_url, public_id: result.public_id };
    }

    

    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      cin,
      image: imageData, //image cloudinary
      role: "boutique",
      forcePasswordChange: true,
    });

    res.status(201).json({
      message: "Utilisateur boutique créé",
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getBoutiqueUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "boutique" })
      .select("name email cin");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ['client', 'boutique'] } });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changeStatusUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }

    // Toggle
    user.isActive = !user.isActive;

    await user.save();

    res.status(200).json({
      message: `User ${
        user.isActive ? "activée" : "désactivée"
      } avec succès`,
      isActive: user.isActive,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier ADMIN
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Accès refusé. Admin uniquement.",
      });
    }

    // Trouver user
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }

    // sécurité extrême
    if (user.role === "admin") {
      return res.status(400).json({
        message: "Impossible de supprimer un admin",
      });
    }

    // Trouver boutiques du user
    const boutiques = await Boutique.find({ owner: user._id });

    for (const boutique of boutiques) {

      // supprimer logo boutique
      if (boutique.logo?.public_id) {
        await cloudinary.uploader.destroy(boutique.logo.public_id);
      }

      // récupérer produits
      const produits = await Produit.find({
        boutiqueId: boutique._id,
      });

      // for (const produit of produits) {
      //   if (produit.imageProduit?.public_id) {
      //     await cloudinary.uploader.destroy(
      //       produit.imageProduit.public_id
      //     );
      //   }
      // }
      await Promise.all(
        produits.map((p) =>
          p.imageProduit?.public_id
            ? cloudinary.uploader.destroy(p.imageProduit.public_id)
            : null
        )
      );

      // supprimer produits
      await Produit.deleteMany({
        boutiqueId: boutique._id,
      });

      // supprimer boutique
      await boutique.deleteOne();
    }

    // supprimer user
    await User.findByIdAndDelete(user._id);

    // supprimer image USER
    if (user.image?.public_id) {
      await cloudinary.uploader.destroy(user.image.public_id);
    }

    res.status(200).json({
      message: "Utilisateur et ses dépendances supprimés avec succès",
    });

  } catch (error) {
    console.error("deleteUser error:", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
}


/**
 * ADMIN - Ajouter une boutique
 */
export const createBoutique = async (req, res) => {
  try {
    const {
      name_shop,
      description,
      phone,
      box,
      openingDays,
      openingHour,
      closingHour,
      facebook,
      instagram,
      website,
      proprietaire,
    } = req.body;

    let logoData = { url: "", public_id: "" };
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "boutiques",
      });
      logoData = { url: result.secure_url, public_id: result.public_id };
    }

    const boutique = await Boutique.create({
      name_shop,
      logo: logoData,
      description,
      phone,
      box,
      openingDays,
      openingHour,
      closingHour,
      facebook,
      instagram,
      website,
      owner: proprietaire,
    });

    res.status(201).json({
      message: "Boutique créée avec succès",
      boutique,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getBoutiques = async (req, res) => {
  try {
    const boutiques = await Boutique.find();
      // .select("name email cin");

    res.status(200).json(boutiques);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBoutique = async (req, res) => {
  const id = req.params.id;
  try {
    const boutique = await Boutique.findById(id)
    res.status(200).json(boutique);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changeStatusBoutique = async (req, res) => {
  try {
    const { id } = req.params;

    const boutique = await Boutique.findById(id);

    if (!boutique) {
      return res.status(404).json({
        message: "Boutique introuvable",
      });
    }

    // Toggle
    boutique.isActive = !boutique.isActive;

    await boutique.save();

    res.status(200).json({
      message: `Boutique ${
        boutique.isActive ? "activée" : "désactivée"
      } avec succès`,
      isActive: boutique.isActive,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteBoutique = async (req, res) => {
  try {
    const { id } = req.params;

    // Trouver la boutique
    const boutique = await Boutique.findById(id);

    if (!boutique) {
      return res.status(404).json({
        message: "Boutique introuvable",
      });
    }

    // Sécurité (OPTION mais recommandé)
    // Autoriser seulement admin ou owner
    if (
      req.user.role !== "admin" &&
      boutique.owner.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "Non autorisé à supprimer cette boutique",
      });
    }

    // Supprimer le logo sur Cloudinary
    if (boutique.logo?.public_id) {
      await cloudinary.uploader.destroy(boutique.logo.public_id);
    }

    // supprimer les images produits + produits
    const produits = await Produit.find({ boutiqueId: boutique._id });

    for (const produit of produits) {
      if (produit.imageProduit?.public_id) {
        await cloudinary.uploader.destroy(produit.imageProduit.public_id);
      }
    }

    await Produit.deleteMany({ boutiqueId: boutique._id });

    // Supprimer la boutique
    await boutique.deleteOne();

    res.status(200).json({
      message: "Boutique supprimée avec succès",
    });

  } catch (error) {
    console.error("Erreur deleteBoutique:", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};
