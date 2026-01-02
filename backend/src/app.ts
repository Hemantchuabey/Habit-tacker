
import express = require("express");
import cors = require("cors");
import dotenv = require("dotenv");
import connectDB from './utils/db';
import authRoutes from './routes/auth';
import cookieParser = require("cookie-parser")
import habitRoutes from "./routes/habit"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))

app.use(express.json())
app.use(cookieParser());

app.get('/', (_req, res) => {
  res.json({ message: 'Habit Tracker API is running' });
});


app.use("/api/auth",authRoutes)
app.use("/api/habits",habitRoutes)





app.use((err:any, _req:any,res:any, _next:any) => {
  console.log(err.stack)
  res.status(500).json({message:"Internal Server Error"})
})


const serverStart = async () => {
  await connectDB()
  app.listen(PORT,() => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Connecting to MongoDB Atlas...`);
  })
}


serverStart()