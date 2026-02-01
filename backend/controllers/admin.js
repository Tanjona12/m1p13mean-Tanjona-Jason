import User from "../models/user.js";
import Boutique from "../models/boutique.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";



/**
 * ADMIN - Ajouter un utilisateur propriétaire (role=boutique)
 */
export const createBoutiqueUser = async (req, res) => {
  try {

    const { name, email, password, cin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "users",
      });
      imageUrl = result.secure_url;
    }

    

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      cin,
      image: imageUrl, //image cloudinary
      role: "boutique",
      forcePasswordChange: true,
    });

    res.status(201).json({
      message: "Utilisateur boutique créé",
      user: {
        id: user._id,
        name: user.name,
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

    let logoUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "boutiques",
      });
      logoUrl = result.secure_url;
    }

    const boutique = await Boutique.create({
      name_shop,
      logo: logoUrl,
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