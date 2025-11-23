import Chat from "../models/Chat.js"


//API Controller for creating a new Chat
export const createChat = async (req, res) => {
    try {
        const userId = req.user._id

        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
            userName: req.user.name
        }

        await Chat.create(chatData)
        res.json({ success: true, message: "Chat created" })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// API controller for getting Chat

export const getChats = async (req, res) => {
    try {
        const userId = req.user._id
        const Chats = await Chat.find({ userId }).sort({ updatedAt: -1 })
        res.json({ success: true, Chats })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//API Controller for deleting a Chat
export const deleteChat = async (req, res) => {
    try {
        const userId = req.user._id
        const {chatId} = req.body

        await Chat.deleteOne({_id: chatId, userId})

        res.json({ success: true, message:"Chat Deleted" })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}