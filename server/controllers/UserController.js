import { createError } from "../error.js";
import User from '../models/UserModel.js';





export const updateUser = async (req, res, next) => {

    if (req.params.id == req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true
                }
            )

            res.status(200).json(updatedUser)

        } catch (err) {
            next(err)
        }
    }
    else {
        return next(createError(403, "You can update only your account!"))
    }



}


export const deleteUser = (req, res, next) => {
    res.json("it is succesful user route")

}


export const getUser = (req, res, next) => {
    res.json("it is succesful user route")
}


export const subscribe = (req, res, next) => {
    res.json("it is succesful user route")
}



export const unsubscribe = (req, res, next) => {
    res.json("it is succesful user route")
}


export const like = (req, res, next) => {
    res.json("it is succesful user route")
}


export const dislike = (req, res, next) => {
    res.json("it is succesful user route")
}