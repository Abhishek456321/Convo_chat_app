import { Request, Response } from "express";
import messageModel from "../schema/messageModel.js";
import { getSocketId, io } from "../socket/socket.js";

export const storeMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const senderId = req?.user?.id;
    const receiverId = req.params.id;
    const text = req.body.text;
    const newMessage = new messageModel({
      sender: senderId,
      receiver: receiverId,
      text: text,
    });
    const result = await newMessage.save();
    if (result) {
      const receiverSocket = getSocketId(receiverId);
      if (receiverSocket) {
        io.to(receiverSocket).emit("newMessage", result);
      }

      const senderSocket = getSocketId(senderId as string);
      if (senderSocket) {
        io.to(senderSocket).emit("newMessage", result);
      }

      res.json({ success: true, message: "Message sent successfully." });
      return;
    }
  } catch (error) {
    res.json({ success: false, message: "server/db error" });
    return;
  }
};

// get all message of particular sender and receiver

export const getMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const senderId = req?.user?.id;
    const receiverId = req.params.id;
    // conditions
    const condition1 = { sender: senderId, receiver: receiverId };
    const condition2 = { sender: receiverId, receiver: senderId };
    const messages = await messageModel
      .find({
        $or: [condition1, condition2],
      })
      .sort({ createdAt: 1 });
    if (messages[0]) {
      res.json({ success: true, data: messages });
      return;
    }
  } catch (error) {
    res.json({ success: false, message: "server/db error." });
    return;
  }
};
