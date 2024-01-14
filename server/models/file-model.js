import mongoose from "mongoose";


const fileSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter file name'],
        unique: true,
    },
    size: {
        type: Number,
        required: [true, 'Please enter file size'],
    },
    type: {
        type: String,
        required: [true, 'Please enter file type'],
    },
    url: {
        type: String,
        required: [true, 'Please enter file url'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});


const File = mongoose.model("File", fileSchema);
export default File;
