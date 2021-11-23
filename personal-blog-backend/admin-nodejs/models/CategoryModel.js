const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  create_time: { type: Number, default: Date.now },
  desc: { type: String },
  icon: { type: String },
  blog_num: { type: Number, default: 0 },
  blogs_id: { type: Array },
  is_deleted: { type: Boolean, default: false },
});

const CategoryModel = mongoose.model('categories', categorySchema);

module.exports = CategoryModel;
