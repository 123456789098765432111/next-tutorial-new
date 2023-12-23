import mongoose from "mongoose";

const connect = async () => {
  try {
   await mongoose.connect("mongodb+srv://Umidjon:Umidjon2005@cluster0.3mqkdgy.mongodb.net/Umidjon", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw new Error("Connection failed!");
  }
};

export default connect;
