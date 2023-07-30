import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    user_id: {
      // Custom _id field with a unique value
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: [true, "first name is required"],
      unique: true,
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "e-mail is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      require: true,
    },
    // DOB: {
    //   type: Date,
    // },
    // Gender: {
    //   type: String,
    //   enum: ["M", "F", "O"],
    // },
    // img: {
    //   type: String,
    // },
    // PhoneNumber: {
    //   type: Number,
    //   validate: {
    //     validator: function (v) {
    //       return /^[0-9]{10}$/.test(v); // Validates a 10-digit phone number.
    //     },
    //     message: (props) =>
    //       `${props.value} is not a valid 10-digit phone number!`,
    //   },
    // },
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
