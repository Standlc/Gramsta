const router = require('express').Router();
const User = require('../models/User.cjs');
const Post = require('../models/Post.cjs');
const bcrypt = require('bcrypt');
const  verify = require('../verifyToken.cjs');

//UPDATE
router.put('/:id', verify, async (req, res) => {
    if (req.user.id === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try { 
            const updatedUser = await User.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedUser)
        } catch (err) {
            res.status(400).json(err)
        }
    } else {
        res.status(403).json('Not your account.')
    }
})

// router.put('/:id', async (req, res) => {
//     if (req.body.userId === req.params.id) {
//         if (req.body.password) {
//             const salt = await bcrypt.genSalt(10);
//             req.body.password = await bcrypt.hash(req.body.password, salt)
//         }
//         try {
//             const updatedUser = await User.findByIdAndUpdate(req.params.id,
//                 { $set: req.body },
//                 { new: true }
//             );
//             res.status(200).json(updatedUser)
//         } catch (err) {
//             res.status(400).json(err)
//         }
//     } else {
//         res.status(401).json('Not your account.')
//     }
// })


//DELETE USER
router.delete('/:id', verify, async (req, res) => {
    if (req.user.id === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({ username: user.userId })
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json('user deleted.')
            } catch (error) {
                res.status(500).json(error)
            }
        } catch (error) {
            res.status(404).json('user not found.')
        }

    } else {
        res.status(401).json('Not your account to delete.')
    }
})

//GET A USER
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, ...others } = user._doc;
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL USERS 
/*
router.get('/:username/all', async (req, res) => {
    try {
        const users = await User.filter((user) => {
            return user.username.includes(req.params.username)
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})*/
//SEARCH FOR USERS
router.get('/users/:search', async (req, res) => {
    try {
        const users = await User.where(username.includes(req.params.search))
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

//FOLLOW A USER
router.put("/:id/follow", verify, async (req, res) => {
    if (req.user.id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const userFollowing = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne(
                    { $push: { followers: req.body.userId } });
                await userFollowing.updateOne(
                    { $push: { followings: req.params.id } },
                    { new: true });
                res.status(200).json(userFollowing)
            } else {
                res.status(403).json('you already follow this user')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('cant follow yourself')
    }
})

//UNFOLLOW A USER
router.put("/:id/unfollow", verify, async (req, res) => {
    if (req.user.id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const userFollowing = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await userFollowing.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json(userFollowing)
            } else {
                res.status(403).json('you dont follow this user')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('cant unfollow yourself')
    }
})

//GET USER FOLLOWINGS 
router.get('/:id/followings', async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        const friendsUsers = await Promise.all(
            user.followings.map((friendsId) => {
                return User.findById(friendsId);
            })
        );
        res.status(200).json(friendsUsers);
    } catch (error) {
    }
})

//GET USER FOLLOWERS 
router.get('/:id/followers', async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        const friendsUsers = await Promise.all(
            user.followers.map((friendsId) => {
                return User.findById(friendsId);
            })
        );
        res.status(200).json(friendsUsers);
    } catch (error) {
    }
})



module.exports = router;

