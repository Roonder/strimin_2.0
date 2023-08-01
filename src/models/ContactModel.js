import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    strimer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Strimer'
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        min: [13, "Inserta un número válido (inicia con \"+58\")"],
        required: true
    }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;