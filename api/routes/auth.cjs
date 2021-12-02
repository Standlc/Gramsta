const router = require('express').Router();
const User = require('../models/User.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//REGISTER
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json(err)
    }
})

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(404).json('Wrong credentials.')

        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(404).json('Wrong credentials.')

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '5d' }
        );

        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken})
    } catch (error) {
        res.status(500).json(err)
    }
});

module.exports = router;