import mongoose from "mongoose";

interface IUser {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  // fullname: {
  //   type: String,
  //   required: [true, "please provide your fullname"],
  //   unique: true,
  // },
  username: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
  },
  // confirmPassword: {
  //   type: String,
  //   required: [true, "please enter the password again"],
  // },
  // isVerified: {
  //   type: Boolean,
  //   default: false,
  // },
  // isAdmin: {
  //   type: Boolean,
  //   default: false,
  // },
  // forgotPasswordToken: String,
  // forgotPasswordTokenExpiry: Date,
  // verifyToken: String,
  // verifyTokenExpiry: Date,
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
export type { IUser }; // Export the IUser type
