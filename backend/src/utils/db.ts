import mongoose = require("mongoose");
import dotenv = require("dotenv");
dotenv.config()


console.log('🔍 Debug - Checking environment variables:');
console.log('MONGODB_URI exists?', !!process.env.MONGODB_URI);
console.log('MONGODB_URI value:', process.env.MONGODB_URI ? '***hidden***' : 'NOT FOUND')



const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI as string)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        console.error('MongoDB connection error:',err);
    process.exit(1);
    }
}

export default connectDB;