const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  create_time: { type: Number, default: Date.now },
  last_modify_time: { type: Number, default: Date.now },
  content: { type: String },
  status: { type: Number, default: 0 }, // publishing status of the blog, 0: not published, 1: published
  category_id: { type: String, required: true },
  tags_id: { type: Array },
  is_deleted: { type: Boolean, default: false },
  desc: { type: String, required: true },
});

const BlogModel = mongoose.model('blogs', blogSchema);

module.exports = BlogModel;
