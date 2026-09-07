import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v2 as cloudinary } from "cloudinary";
import { getReceiverSocketId, io } from "../utils/socket.js";

const getUserForSidebar = asyncHandler(async (req, res) => {
  try {
    const loggedInUserId = req.user?._id;
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("username _id role");

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in getUserForSidebar", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const getAdminAccForSidebar = asyncHandler(async (req, res) => {
  try {
    const loggedInUserId = req.user?._id;
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
      isAdmin: true,
    }).select("username ");

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in getUserForSidebar", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getMessages = asyncHandler(async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user?._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    const recevierSocketId = getReceiverSocketId(receiverId);
    if (recevierSocketId) {
      io.to(recevierSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in getUserForSidebar", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { getUserForSidebar, getMessages, sendMessage, getAdminAccForSidebar };
