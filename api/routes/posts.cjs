const router = require('express').Router();
const User = require('../models/User.cjs');
const Post = require('../models/Post.cjs');
const verify = require('../verifyToken.cjs');
const bcrypt = require('bcrypt');

//CREATE POST
router.post('/', verify, async (req, res) => {
    if (req.user.id === req.body.userId) {
        const newPost = new Post(req.body);
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost)
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

//UPDATE POST
router.put('/:id', verify, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.user.id) {
            await post.updateOne({ $set: req.body }, { new: true });
            const updatedPost = await Post.findById(req.params.id);
            res.status(200).json(updatedPost);
        } else {
            res.status(101).json('you can update your post only')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE POST
router.delete('/:id', verify, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.user.id) {
            try {
                await post.delete();
                res.status(200).json("post deleted");
            } catch (error) { }
        } else {
            res.status(101).json('you can only delete your posts')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//LIKE POST
router.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json('posts has been liked')
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
        }
    } catch (error) {
        res.status(500).json(error);
    }


})

//update all posts usernames and username's photos
/*
router.put('/:username/posts', async (req, res) => {
    try {
        const updatedPosts = await Post.find({ username: req.params.username })

        await updatedPosts.updateMany({ $set: req.body, }, { new: true }
        );
        res.status(200).json(updatedPosts);
    } catch (error) {
        res.status(101).json(error)
    }
});
*/
/*if (post.username === req.body.username)
    try {
        const updatedPost = await Post.findByUsernameAndUpdate(req.body.username, {
            $set: req.body,
        }, { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        
    } else {
    res.status(101).json('you can update your post only')
}
} catch (error) {
res.status(500).json(error)
}*/

//GET A POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json(error)
    }
})

//GET FEED POSTS
router.get('/feed/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const currentUserPosts = await Post.find({ userId: currentUser._id });
        const friendsPosts = await Promise.all(
            currentUser.followings.map((friendsId) => {
                return Post.find({ userId: friendsId });
            })
        );
        res.status(200).json(currentUserPosts.concat(...friendsPosts))
    } catch (error) {
        res.status(500).json(error)
    }
})



router.get('/profile/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        const posts = await Post.find({ userId: user._id })
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error)
    }
})



//GET ALL POST ID OF USER 
router.get('/postId/all/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId);
    const posts = await Post.find({ userId: user._id })
    const PostsId = posts.map((post) => {
        const { caption, photo, userId, likes, comments, updatedAt, __v, ...others } = post._doc;
        return { ...others };
    })
    res.status(200).json(PostsId)
})


//DELETE A COMMENT
router.put('/comment/delete/:commentId', async (req, res) => {
    const post = await Post.findById(req.body.postId);
    if (post.userId === req.body.userId) {
        // const comment = post.comments.filter((c) => {
        //     return c._id == req.params.commentId
        // })

        await post.updateOne({ $pull: { comments: { _id: "613fabc845932271ef6b0b57" } } }, { new: true })
        const updatedPost = await Post.findById(req.body.postId);
        //    await post.updateOne({ $pull: { comments: req.params.commentId } })
        res.status(200).json(updatedPost);
    }
})
/*
//Getall posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error)
    }
});
*/
module.exports = router;
