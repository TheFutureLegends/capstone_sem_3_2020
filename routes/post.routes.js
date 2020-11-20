import express from "express";

import middleware from "../src/middleware/index.js";

import postBackend from "../src/controllers/post/post.backend.controller.js";

const router = express.Router();

router.get(
  "/read",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  postBackend.readPost
);

router.post(
  "/create",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  [middleware.imageUpload.single("image")],
  postBackend.createPost
);

router.get("/edit");

router.put(
  "/update/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  postBackend.updatePost
);

router.delete(
  "/delete/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  postBackend.deletePost
);

export default router;
