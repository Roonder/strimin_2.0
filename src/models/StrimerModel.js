import mongoose from "mongoose";
import bcryptjs from "bcryptjs"
import generateId from "@/helpers/generateId";

const strimerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    user: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: generateId()
    },
    profilePic:{
        data: Buffer,
        contentType: String
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});

strimerSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

strimerSchema.methods.checkPassword = async function(passwordInput) {
    return await bcryptjs.compare(passwordInput, this.password);
}


const Strimer = mongoose.models?.Strimer || mongoose.model('Strimer', strimerSchema);
export default Strimer;