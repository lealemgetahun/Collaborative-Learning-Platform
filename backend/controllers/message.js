const Group = require('../models/group');

exports.sendMessage = async (req, res, next) => {
  try {
    const { groupId, userId, message } = req.body;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const newMessage = {
      user: userId,
      message: message,
    };

    group.chat.push(newMessage);

    await group.save();

    res.status(200).json({
      message: 'Message sent successfully',
      chat: group.chat,
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

exports.getChat = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.status(200).json({
      message: 'Chat retrieved successfully',
      chat: group.chat,
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};
