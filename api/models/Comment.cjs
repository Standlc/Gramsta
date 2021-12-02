const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema(
    {
        comment:{
            type:String,
        },
        userId: {
            type: String
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model("Comment", CommentSchema)
