import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        request: true,
        unique: true,
    },
    email: {
        type: String,
        request: true,
        unique: true,
    },
    password: {
        type: String,
        request: true,
    },
    avatar: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK-5-DUAn8F-Uj_pHNDRyprT6W7FV4WVEBtw&s',
    },
},{ timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;