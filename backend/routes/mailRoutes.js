import express from "express";
import {
    getMails,
    getMail,
    createMail,
    updateMail,
    deleteMail
} from "../controllers/mailController.js";

const router = express.Router();

router.get("/", getMails);
router.get("/:id", getMail);
router.post("/", createMail);
router.put("/:id", updateMail);
router.delete("/:id", deleteMail);

export default router;