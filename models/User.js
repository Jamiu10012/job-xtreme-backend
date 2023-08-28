import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "E-mail is required"],
      unique: true, // Make the email field unique
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["jobseeker", "employer", "admin"],
      required: true,
    },
    RegistrationDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
