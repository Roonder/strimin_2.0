 import mongoose from "mongoose";

 const serviceSchema = moongose.Schema({
    strimer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Strimer'
    },
    service: {
        type: String,
        lowercase: true,
        trim: true
    },
    color: {
        type: String
    }
 });

 const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

 export default Service;