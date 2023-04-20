const Group = require('../models/group');

exports.startCall = async (req, res, next) => {
  try {
    const { groupId, userId } = req.body;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    group.call.users.push(userId);

    await group.save();

    res.status(200).json({
      message: 'Call started successfully',
      users: group.call.users,
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

exports.endCall = async (req, res, next) => {
  try {
    const { groupId, userId } = req.body;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    group.call.users = group.call.users.filter((user) => user !== userId);

    await group.save();

    res.status(200).json({
      message: 'Call ended successfully',
      users: group.call.users,
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};
