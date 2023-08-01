import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
    strimer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Strimer'
    },
    isCC: {
        type: Boolean,
        required: true,
        default: false
    },
    screen: {
        type: String,
        trim: true,
        default: ""
    },
    contact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
        required: true,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    pin: {
        type: Number,
        trim: true
    },
    expDate: {
        type: Date,
        required: true
    },
    state: {
        type: String,
        required: true,
        default: "Activo"
    }
});

const Client = mongoose.model('Client', clientSchema);
export default Client;