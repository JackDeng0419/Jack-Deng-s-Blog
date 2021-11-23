const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  create_time: { type: Number, default: Date.now },
  blogs_id: { type: Array },
  color: { type: String, default: '_' }, // '_' means transparent
  is_deleted: { type: Boolean, default: false },
  blog_num: { type: Number, default: 0 },
});

const TagModel = mongoose.model('tags', tagSchema);

module.exports = TagModel;
