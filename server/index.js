import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/UsersRoute.js';
import videoRoutes from './routes/VideosRoute.js';
import commentRoutes from './routes/commentsRote.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';

const app = express();
dotenv.config();

const connect = () => {

    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to Mongo DB");
        })
        .catch((err) => { throw err; })
}

app.use(cookieParser())
app.use(express.json())


app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/auth", authRoutes)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";

    return res.status(status).json({
        success: false,
        message: message,
        status: status,
    })
})


const PORT = 8800;

app.listen(PORT, () => {
    connect();
    console.log(`Connected to ${PORT} PORT`);
})