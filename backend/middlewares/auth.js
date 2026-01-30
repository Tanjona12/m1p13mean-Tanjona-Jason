import jwt from "jsonwebtoken";

/**
 * Vérifie si l'utilisateur est connecté
 * - Token présent
 * - Token valide
 */

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

 // 1. Vérifier présence du token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  try {
    // 2. Extraire le token
    const token = authHeader.split(" ")[1];

    // 3. Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Sauvegarder les infos dans la requête
    req.user = decoded; // { userId, role }
    next(); // autorisé à continuer
  } catch {
    res.status(401).json({ message: "Token invalide" });
  }
};
