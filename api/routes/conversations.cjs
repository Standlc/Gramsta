const router = require("express").Router();
const User = require("../models/User.cjs");
const Message = require("../models/Message.cjs");
const Conversation = require("../models/Conversation.cjs");

//NEW CONVERSATION
router.post("/:receiverId", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.userId, req.params.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET CONVERSATIONS OF A USER
router.get("/:userId", async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    let contactsInfos = [];
    await Promise.all(
      conversations.map(async (conversation) => {
        return await Promise.all(
          conversation.members.map(async (member) => {
            if (member !== req.params.userId) {
              const conversationId = conversation._id;
              const user = await User.findById(member);
              const messages = await Message.find({
                conversationId: conversation._id,
              });
              const lastMessage = messages.pop();
              contactsInfos.push({ ...user._doc, conversationId, lastMessage });
            }
          })
        );
      })
    );

    res.status(200).json(contactsInfos);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE CONVERSATION

module.exports = router;
