import multer from "multer";

const storage = multer.diskStorage({}); 
// stockage temporaire (obligatoire pour Cloudinary)

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 2MB
});

export default upload;
