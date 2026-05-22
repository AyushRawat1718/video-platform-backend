import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, //Could be helpful when searching, but don't use it everywhere blindly
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //Cloudnary url would be stored here
      required: true,
    },
    coverImage: {
      type: String, //Cloudnary url would be stored here
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // Store refresh token for authentication flow
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Middleware that runs before saving user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Custom method to compare entered password with hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Custom method to generate short-lived access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      // Store user info inside token payload
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    // Secret key used to sign token
    process.env.ACCESS_TOKEN_SECRET,
    {
      // Token expiration duration
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Custom method to generate long-lived refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      // Minimal payload for refresh token
      _id: this._id,
    },
    // Secret key for refresh token
    process.env.REFRESH_TOKEN_SECRET,
    {
      // Refresh token expiry duration
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
