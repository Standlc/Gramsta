const router = require('express').Router();
const Message = require('../models/Message.cjs');

//SEND MESSAGE
router.post('/', async (req, res) => {
    const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET MESSAGES LAST 10
router.get('/:conversationId', async (req, res) => {
    // const query = req.query.new;
    const number = req.query.number;
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        }).sort({ _id: -1 }).limit(parseFloat(number));
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error)
    }
})

// router.get('/:conversationId', async (req,res)=>{
//     try {
//         const messages = await Message.find({
//             conversationId : req.params.conversationId
//         });
//         res.status(200).json(messages);
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })



module.exports = router;