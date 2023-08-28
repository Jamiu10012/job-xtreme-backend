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
      // validate: {
      //   validator: function (value) {
      //     // Password validation logic
      //     const hasNumber = /\d/.test(value);
      //     const hasAlphabet = /[a-zA-Z]/.test(value);
      //     const hasSpecialCharacter =
      //       /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-="']/.test(value);
      //     const hasMinLength = value.length >= 8;

      //     return (
      //       hasNumber && hasAlphabet && hasSpecialCharacter && hasMinLength
      //     );
      //   },
      //   message:
      //     "Password must include a number, an alphabet, a special character, and be at least 8 characters long.",
      },
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
