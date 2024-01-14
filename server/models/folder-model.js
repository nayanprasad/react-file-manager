import mongoose from "mongoose";


const folderSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter folder name'],
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
        default: null,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
    }],
    folders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
    }]
});


const Folder = mongoose.model("Folder", folderSchema);
export default Folder;
