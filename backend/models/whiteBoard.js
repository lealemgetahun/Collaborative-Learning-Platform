const mongoose = require('mongoose');

const whiteboardSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Whiteboard', whiteboardSchema);
