import mongoose from "mongoose";
const connectToDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log("successfully connected to mongodb.");
  } catch (error: any) {
    console.log("mongodb error : ", error);
    process.exit(1);
  }
};
export default connectToDb;
