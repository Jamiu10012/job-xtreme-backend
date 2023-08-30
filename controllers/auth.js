import mongoose from "mongoose";
import User from "../models/User.js";
import JobSeeker from "../models/JobSeeker.js";
import Employer from "../models/Employer.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import UserVerification from "../models/UserVerification.js";
// import nodemon from "nodemon";
import nodemailer from "nodemailer";

import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// process.env.EMAIL_USER
// process.env.EMAIL_PASS,
// user: "ibrahimjamiu026@gmail.com",
// pass: "mfdelxsnyipifwwq",
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for message");
    console.log(success);
  }
});

const PASSWORD_COMPLEXITY_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const role = req.body.role;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists." });
    }
    if (!PASSWORD_COMPLEXITY_REGEX.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and contain at least one letter, one number, and one special character.",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({ ...req.body, password: hash });
    const newUser = await user.save();
    // const newUser = await user.save().then((result) => {
    //   sendVerificatonEmail(result, res);
    // });
    if (role === "jobseeker") {
      const jobSeeker = new JobSeeker({
        ...req.body,
        user: newUser._id,
        // full_name: newUser.firstname + " " + newUser.lastname,
        contact_email: newUser.email,
        verified: false,
      });

      // const saveSeeker = await jobSeeker.save().then(() => {
      // return await jobSeeker.save().then((result) => {
      //   sendVerificatonEmail(result, res);
      //   res
      //     .status(201)
      //     .json({ success: true, message: "New jobseeker account created!" });
      // });
      return await jobSeeker
        .save()
        .then((result) => {
          return sendVerificatonEmail(result)
            .then(() => {
              res.status(201).json({
                success: true,
                message: "New jobseeker account created!",
              });
            })
            .catch((error) => {
              res.status(500).json({
                success: false,
                message: "Failed to send verification email.",
              });
            });
        })
        .catch((error) => {
          res.status(500).json({
            success: false,
            message: "Failed to create jobseeker account.",
          });
        });
      // var message = {
      //   from: "ibrahimjamiu026@mail.com",
      //   to: req.body.email,
      //   subject: "Confirm Email",
      //   // text: "Plaintext version of the message",
      //   html: "<p>Click the <a href=''>link</a> to confirm your email</p>",
      // };
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

const sendVerificatonEmail = ({ _id, contact_email }, res) => {
  const currentUrl = "http://localhost:8080";

  const uniqueString = uuidv4() + _id;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: contact_email,
    subject: "Verify your email",
    html: `<p>Verify your email address to complete the signup and login into your account.</p><p>The link <b>expires in 6 hours</b>.</p><p>Click <a href="https://job-xtreme.vercel.app/login">here</a> to proceed</p>`,
  };

  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashUniqueString) => {
      const newVerification = new UserVerification({
        userId: _id,
        uniqueString: hashUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000,
      });

      newVerification
        .save()
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              res.json({
                status: "Success",
                message: "Verification email sent",
              });
            })
            .catch((error) => {
              console.log(error);
              res.json({
                status: "Failed",
                message: "Failed to send verification email",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          res.json({
            status: "Failed",
            message: "Couldn't save verification email data",
          });
        });
    })
    .catch(() => {
      res.json({
        status: "Failed",
        message: "An error occurred while generating the hash",
      });
    });
};

// export const verifyEmail = async (req, res, next) => {
//   let { userId, uniqueString } = req.params
//   UserVerification.find({ userId })
//     .then((result) => {
//       if (result.length > 0) {
//         const { expiresAt } = result[0];
//         const hashUniqueString = result[0];
//         if (expiresAt < Date.now()) {
//           UserVerification.deleteOne({ userId })
//             .then((result) => {
//               User.deleteOne({ _id: userId })
//                 .then(() => {
//                   let message = "Link has exipered sinup again";
//                   res.redirect(`/auth/verified/error=true&message=${message}`);
//                 })
//                 .catch((error) => {
//                   console.log(error);
//                   let message = "clearing failed";
//                   res.redirect(`/auth/verified/error=true&message=${message}`);
//                 });
//             })
//             .catch((error) => {
//               console.log(error);
//               let message =
//                 "error occured while clearing exipired verification";
//               res.redirect(`/auth/verified/error=true&message=${message}`);
//             });
//         } else {
//           bcrypt
//             .compare(uniqueString, hashUniqueString)
//             .then((result) => {
//               if (result) {
//                 User.updateOne({ _id: userId }, { verified: true })
//                   .then(() => {
//                     UserVerification.deleteOne(userId)
//                       .then(() => {
//                         res.json({ status: "Success", message: "Verified" });
//                       })
//                       .catch((error) => {
//                         console.log(error);
//                         let message = "error occured while finalizing";
//                         res.redirect(
//                           `/auth/verified/error=true&message=${message}`
//                         );
//                       });
//                   })
//                   .catch((error) => {
//                     console.log(error);
//                     let message = "error occured while updating record";
//                     res.redirect(
//                       `/auth/verified/error=true&message=${message}`
//                     );
//                   });
//               } else {
//                 let message = "invalid details passed";
//                 res.redirect(`/auth/verified/error=true&message=${message}`);
//               }
//             })
//             .catch((error) => {
//               console.log(error);
//               let message = "error occured while comparing unique";
//               res.redirect(`/auth/verified/error=true&message=${message}`);
//             });
//         }
//       } else {
//         let message = "Account record doesnot exit";
//         res.redirect(`/auth/verified/error=true&message=${message}`);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       let message = "error occured wile checking";
//       res.redirect(`/auth/verified/error=true&message=${message}`);
//     });
// };
// export const verified = async (req, res, next) => {
//   res.json({ status: "Success", message: "Verified" });
// };
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
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "none",
        })
        .status(200)
        .json({ others, token, jobseeker });
    } else if (others.role === "employer") {
      res.status(200).json({ others, token, employer });
    }
  } catch (err) {
    next(err);
  }
};
