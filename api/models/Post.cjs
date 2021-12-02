const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        caption: {
            type: String,
            required: false,
        },
        photo: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        likes: {
            type: Array,
            default: [],
        },
        comments: {
            type: Array,
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model("Post", PostSchema)