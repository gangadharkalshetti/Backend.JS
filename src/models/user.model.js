import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema(
    {
        userName: {
            type: String,
            require: true,
            unique: true,
            lowecase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        fullName: {
            type: String,
            require: true,
            trim: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,  // cloudnaray url
            require: true
        },
        coverImage: {
            type: String // cloudnary url

        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            },
        ],
        password: {
            type: String,
            require: [true, "Password is require"]
        },
        refreshToken: {
            type: String,
        },

    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password =  await bcrypt.hash(this.password, 10)
    next()
    
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    jwt.sign(
        {
            _id: this.id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
     jwt.sign(
        {
            _id: this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model("User", userSchema)