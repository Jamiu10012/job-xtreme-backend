import mongoose from "mongoose";
import User from "../models/User.js";
import JobSeeker from "../models/JobSeeker.js";
import Employer from "../models/Employer.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const role = req.body.role;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists." });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({ ...req.body, password: hash });
    const newUser = await user.save();
    if (role === "jobseeker") {
      const jobSeeker = new JobSeeker({
        ...req.body,
        user: newUser._id,
        // full_name: newUser.firstname + " " + newUser.lastname,
        contact_email: newUser.email,
      });

      return await jobSeeker.save().then(() => {
        res
          .status(201)
          .json({ success: true, message: "New jobseeker account created!" });
      });
    } else if (role === "employer") {
      const employer = new Employer({
        ...req.body,
        user: newUser._id,
        company_name: req.body.company_name,
        industry: req.body.industry,
        contact_email: newUser.email,
        contact_phone: req.body.contact_phone,
      });

      return await employer.save().then(() => {
        res
          .status(201)
          .json({ success: true, message: "New employer account created!" });
      });
    }
    // Create a new user
    console.log(role);
    console.log(newUser);
    res.status(201).json({ message: "User has been created!", user: newUser });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "wrong credientials"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;

    const jobseeker = await JobSeeker.findOne({ user: others._id }).populate(
      "user"
    );
    const employer = await Employer.findOne({ user: others._id }).populate(
      "user"
    );

    // res
    //   // .cookie("access_token", token, {
    //   //   httpOnly: true,
    //   // })
    //   .status(200)
    //   .json({ others, token });

    if (others.role === "jobseeker") {
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "none"
      }).status(200).json({ others, token, jobseeker });
    } else if (others.role === "employer") {
      res.status(200).json({ others, token, employer });
    }
  } catch (err) {
    next(err);
  }
};
