// export const update = (req, res, next) => {};
import User from "../models/User.js";
import { createError } from "../error.js";

export const createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user." });
  }
};
// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Update user by ID
export const updateUserById = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(createError(403, "You can update only your account!"));
  }
};
export const deleteUserById = async (req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json("user has been deleted");
  } catch (err) {
    next(createError(403, "You can delete only your account!"));
  }
};
