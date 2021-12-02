const router = require('express').Router();
const Comment = require('../models/Comment.cjs');
const User = require('../models/User.cjs');
const Post = require('../models/Post.cjs');

//POST A COMMENT 
router.post('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    const newComment = new Comment(req.body)
    const savedComment = await newComment.save();
    await post.updateOne({ $push: { comments: savedComment } });
    res.status(200).json(savedComment)
})

//GET USERS OF POST'S COMMENTS
router.get('/users/:postId', async (req, res) => {

    const post = await Post.findById(req.params.postId);
    try {
        const Postcomments = await Promise.all(
            post.comments.map(async (comment) => {

                const user = await User.findById(comment.userId);
                const { password, email, followers, followings, _id, createdAt, updatedAt, ...others } = user._doc;
                // const commentParse = JSON.parse(comment);
                // return {...userParse, ...commentParse};
                // return {...user.data, ...comment.data};  , 
                return { ...others, ...comment}
            })
        )
        res.status(200).json(Postcomments);
    } catch (error) {
        res.status().json(error);
    }







    // const currentUser = await User.findById(req.params.userId);
    // const currentUserPosts = await Post.find({ userId: currentUser._id });
    // const friendsPosts = await Promise.all(
    //     currentUser.followings.map((friendsId) => {
    //         return Post.find({ userId: friendsId });
    //     })
    // );
    // res.status(200).json(currentUserPosts.concat(...friendsPosts))
})

module.exports = router;
