const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  phrase: { type: String, required: true },
  image: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [String],
});

module.exports = mongoose.model('Post', postSchema);
