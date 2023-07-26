import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    user_id: {
      // Custom _id field with a unique value
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
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
