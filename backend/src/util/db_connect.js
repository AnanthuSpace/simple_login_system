import mongoose from "mongoose";


export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.HOST || "mongodb://localhost:27017/sample-login")
        console.log(`Database Connected`);
    } catch (error) {
        console.log("Database is not connected", error);
    }
}