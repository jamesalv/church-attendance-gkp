import { Router } from "express";
import * as sermonController from "../controllers/sermonController";

const router = Router();

// Sermon routes
router.post("/", sermonController.createSermon);
router.get("/", sermonController.getSermons);

export default router;