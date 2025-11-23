import Chat from "../models/Chat.js";

// CREATE CHAT
export const createChat = async (req, res) => {
  try {
    const chatData = {
      userId: req.user._id,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    };

    const chat = await Chat.create(chatData);

    res.json({
      success: true,
      message: "Chat created",
      chat,   // IMPORTANT: return chat
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET USER CHATS
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id }).sort({ updatedAt: -1 });

    res.json({ success: true, chats });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// DELETE CHAT
export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.body;

    await Chat.deleteOne({ _id: chatId, userId: req.user._id });

    res.json({ success: true, message: "Chat deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
