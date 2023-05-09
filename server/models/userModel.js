import mongoose from 'mongoose';

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required and should be unique'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    }
}, { timestamps: true });

const userModel = mongoose.model('users', userScheme);

export default userModel;