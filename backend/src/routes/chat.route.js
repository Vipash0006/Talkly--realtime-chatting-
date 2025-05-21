import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getStreamToken, getStreamVideoToken } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/token", protectRoute, getStreamToken);
router.get("/video-token", protectRoute, getStreamVideoToken);

export default router;
