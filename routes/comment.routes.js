import express from "express";

import middleware from "../src/middleware/index.js";

const router = express.Router();

/**
 * Get all comment for single post
 * None authentication
 */
router.get("/:post_id");

router.post("/:post_id/create", [middleware.authJwt.verifyToken]);

router.delete("/:post_id/delete/:comment_id", [middleware.authJwt.verifyToken]);

export default router;
