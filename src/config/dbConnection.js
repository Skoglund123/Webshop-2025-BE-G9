const mongoose =  require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://skoglundfilip:Webshop-2025-BE-G9@webbshop-be-g9.bkfy1.mongodb.net/webbshop-be-g9");
    console.log("Connected to Database:", connect.connection.host, connect.connection.name);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDb;
