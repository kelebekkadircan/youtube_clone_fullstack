import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/UserRoute.js';
import commentRoutes from './routes/CommentRoute.js';
import videoRoutes from './routes/VideoRoute.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser'



const app = express()
dotenv.config()


const connect = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to MongoDb Server !!");
        })
        .catch((err) => {
            throw err
        })
}

app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/videos", videoRoutes)


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";

    return res.status(status).json({
        success: false,
        status: status,
        message: message
    })
})


const PORT = 8800;

app.listen(PORT, () => {
    connect();
    console.log(`Connected! to Port : ${PORT}`);
})
