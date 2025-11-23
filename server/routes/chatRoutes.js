import express from "express";
import { createChat, getChats, deleteChat } from "../controllers/chatController.js";
import { protect } from "../middlewares/auth.js";

const chatRouter = express.Router();

// Create Chat → must be POST
chatRouter.post("/create", protect, createChat);

// Get Chats → correct
chatRouter.get("/get", protect, getChats);

// Delete Chat → fix controller
chatRouter.post("/delete", protect, deleteChat);

export default chatRouter;
