import bcrypt from "bcryptjs"

import User from "../models/User.js";
import {createError} from "../utils/error.js";

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({name: req.body.name})

    if(!user) {
      return next(createError(404, "User with this name not found!"))
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

    if(!isPasswordMatch) {
      return next(createError(400, "Wrong password!"))
    }

    const {password, isAdmin, ...restUser} = user._doc

    res.status(201).json(restUser)
  } catch (error) {
    next(error)
  }
}

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash
    })
    await newUser.save()

    res.status(201).send("User has been successfully created")
  } catch (error) {
    next(error)
  }
}