
import mongoose from 'mongoose';
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import { createError } from '../error.js';
import jwt from "jsonwebtoken";


export const signup = async (req, res, next) => {

    // console.log(req.body);

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({ ...req.body, password: hash })

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "User has been created !"
        })





    } catch (err) {

        // next(createError(404, "not found sorry"));

        next(err);
    }

}

export const signin = async (req, res, next) => {

    // console.log(req.body);

    try {

        const user = await User.findOne({ name: req.body.name })

        if (!user) return next(createError(404, "User not found"))

        const isCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isCorrect) return next(createError(404, "Wrong Credentials"))

        const token = jwt.sign({ id: user._id }, process.env.JWT) // take our id and create hash token
        const { password, ...others } = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others)




    } catch (err) {

        // next(createError(404, "not found sorry"));

        next(err);
    }

}

export const google = async (req, res, next) => {

    // console.log(req.body);

    try {

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT);// take our id and create hash token

            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(user._doc)
        }
        else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save()
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT);// take our id and create hash token

            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(savedUser._doc)
        }





    } catch (err) {

        // next(createError(404, "not found sorry"));

        next(err);
    }

}


