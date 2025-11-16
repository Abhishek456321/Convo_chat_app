import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import connectToDb from "./src/config/db_config.js";
import userRouter from "./src/router/userRouter.js";
import { app, server } from "./src/socket/socket.js";
import { messageRouter } from "./src/router/messageRouter.js";
dotenv.config();

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};
app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));

app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

const startServer = async () => {
  try {
    await connectToDb();
  } catch (error) {
    process.exit(1);
  }
  server.listen(4000, () => {
    console.log("port is listing at port 4000");
  });
};
startServer();
