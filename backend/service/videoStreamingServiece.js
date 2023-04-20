const Group = require('../models/group');

exports.startVideoCall = async (req, res, next) => {
  try {
    const { groupId, userId } = req.body;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    group.videoCall.users.push(userId);

    await group.save();

    res.status(200).json({
      message: 'Video call started successfully',
      users: group.videoCall.users,
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

exports.endCall = async (req, res) => {
  try {
    const { room_id } = req.params;
    const room = await Room.findById(room_id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    const { user_id } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { type } = req.body;
    const validTypes = ['audio', 'video'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: 'Invalid call type' });
    }
    const call = room.calls.find(call => call.user_id.toString() === user_id && call.type === type && call.status === 'in-progress');
    if (!call) {
      return res.status(404).json({ message: 'Call not found' });
    }
    call.status = 'ended';
    room.save();
    return res.status(200).json({ message: 'Call ended successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

