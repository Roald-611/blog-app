import express from "express";
import fs from "fs";
import {
  createBlogController,
  findAllBlogController,
  findAllBlogsOfOneUserController,
  deleteBlogController,
  updateBlogController,
} from "../controllers/blog.controller.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { createBlogValidator } from "../validators/blog.validator.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir('./public/uploads/',(err)=>{
      cb(null, './public/uploads/');
   });
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb("Invalid File Format!", false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});


blogRouter.post(
  "/",
  upload.fields([{name:"imageThumbnail",maxCount:1},{name:"images",maxCount:5}]),
  createBlogController
);

// blogRouter.get('/',)

export { blogRouter };
