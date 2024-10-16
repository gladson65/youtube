import mongoose from "mongoose";


const { Schema } = mongoose;

// creating Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
})

const userModel = mongoose.model('user', userSchema);
export default userModel;