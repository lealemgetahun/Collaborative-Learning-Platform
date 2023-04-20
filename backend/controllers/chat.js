const Group = require('../models/groups');
const User = require("../models/user")

const sendMessage = async (groupId, senderId, messageContent) => {
  try {
    const group = await Group.findById(groupId).populate('members');
    if (!group) {
      throw new Error('Group not found');
    }
    const message = {
      sender: senderId,
      content: messageContent
    };
    group.messages.push(message);
    await group.save();
    group.members.forEach(member => {
      // Send the message to each member of the group except the sender
      if (member._id.toString() !== senderId.toString()) {
        // Send the message using your preferred messaging system
        // For example, you could use Socket.IO or WebSockets
        sendMessageToUser(member._id, message);
      }
    });
    return message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Method to receive messages for a group
const receiveMessages = async (groupId) => {
  try {
    const group = await Group.findById(groupId).populate('messages.sender');
    if (!group) {
      throw new Error('Group not found');
    }
    return group.messages;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
