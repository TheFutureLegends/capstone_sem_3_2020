import express from "express";

import middleware from "../src/middleware/index.js";
import userController from "../src/controllers/user/user.controller.js";

const router = express.Router();

router.get(
  "/profile",
  [middleware.authJwt.verifyToken],
  userController.getUser
);

router.get("/:username", userController.getProfile);

export default router;
