import express from "express";

import middleware from "../src/middleware/index.js";
import { getProfile } from "../src/controllers/user/user.controller.js";

const router = express.Router();

router.get("/profile", [middleware.authJwt.verifyToken], getProfile);

router.get("/call", (req, res) => {
  return res.status(200).send("calling router");
});

export default router;
