import mongoose from "mongoose";

const methodSchema = mongoose.Schema({
    method: {
        type: String,
        trim: true,
        required: true
    }
});

const Method = mongoose.models.Method || mongoose.model('Method', methodSchema);

export default Method;