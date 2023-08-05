import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
    strimer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Strimer'
    },
    requireEmail: {
        type: Boolean,
        default: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        trim: true,
        default: ""
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        trim: true,
    },
    hasMethod: {
        type: Boolean,
        required: true,
        default: false
    },
    creationMethod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Method',
        trim: true,
        default: ""
    },
    accountPrice: {
        type: Number,
        trim: true,
        required: true
    },
    pricePerUser: {
        type: Number,
        trim: true,
        required: true
    },
    maxUsers: {
        type: Number,
        required: true,
        trim: true,
    },
    expDate: {
        type: Date,
        required: true
    }
});

const Account = mongoose.model?.Account || mongoose.model('Account', accountSchema);

export default Account;