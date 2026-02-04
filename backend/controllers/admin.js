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
    const users = await User.find();

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

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  let users;
  try{
    users = await User.findByIdAndDelete(id)
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(500).json({message: "Utilisateur non trouvé"});
  }
  return res.status(200).json({message:"Suppréssion succées"});
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

export const deleteBoutique = async (req, res, next) => {
  const id = req.params.id;

  let boutiques;
  try{
    boutiques = await Boutique.findByIdAndDelete(id)
  } catch (err) {
    console.log(err);
  }
  if (!boutiques) {
    return res.status(500).json({message: "Impossible de supprimé, boutique non trouvé"});
  }
  return res.status(200).json({message:"Suppréssion succées"});
};