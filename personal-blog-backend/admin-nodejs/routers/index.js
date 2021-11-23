const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// const filter = { password, __v: 0 };

const BlogModel = require('../models/BlogModel');
const CategoryModel = require('../models/CategoryModel');
const TagModel = require('../models/TagModel');

router.get('/test', (req, res) => {
  res.status(200).send('Hello');
});

router.post('/api/login', (req, res) => {
  const { username, password, remember } = req.body;
  if (username !== 'admin' || password !== 'admin') {
    res.send({ status: 1, msg: 'incorrect username or password!' });
  } else {
    const user = {
      username: username,
      password: password,
      remember: remember,
    };
    res.send({ status: 0, data: user });
  }
});

router.post('/manage/category/add', (req, res) => {
  const { name, desc, icon } = req.body;
  CategoryModel.create({ name, desc, icon: icon || '_' })
    .then((category) => {
      console.log('Add category successfully: ', category);
      res.send({ status: 0, data: category });
    })
    .catch((error) => {
      console.error('Add category error', error);
      res.send({ status: 1, msg: 'Add category error, please try again' });
    });
});

router.get('/manage/category/list', (req, res) => {
  CategoryModel.find({ is_deleted: false })
    .then((categories) => {
      res.send({ status: 0, data: categories });
    })
    .catch((error) => {
      console.error('Failed to get the category list', error);
      res.send({
        status: 1,
        msg: 'Failed to get the category list, please try again.',
      });
    });
});

router.post('/manage/category/update', (req, res) => {
  const { categoryId, name, desc, icon } = req.body;
  console.log(req.body);
  CategoryModel.findOneAndUpdate({ _id: categoryId }, { name, desc, icon })
    .then((oldCategory) => {
      console.log(oldCategory);
      res.send({ status: 0 });
    })
    .catch((error) => {
      console.error('Update category error', error);
      res.send({
        status: 1,
        msg: 'Failed to update the category, please try again!',
      });
    });
});

router.post('/manage/category/delete', (req, res) => {
  const { category_id, blog_num } = req.body;
  if (blog_num !== 0) {
    res.send({
      status: 1,
      msg: 'The category can only be deleted when the blog number is not 0.',
    });
    return;
  } else {
    CategoryModel.findOneAndUpdate({ _id: category_id }, { is_deleted: true })
      .then(() => {
        res.send({ status: 0 });
      })
      .catch((error) => {
        console.error('Delete category error:', error);
        res.send({
          status: 1,
          msg: 'Failed to delete the category, please try again.',
        });
      });
  }
});

router.get('/manage/tag/list', (req, res) => {
  TagModel.find({ is_deleted: false })
    .then((tags) => {
      res.send({ status: 0, data: tags });
    })
    .catch((error) => {
      console.error('Failed to get the tag list', error);
      res.send({
        status: 1,
        msg: 'Failed to get the category list, please try again.',
      });
    });
});

router.post('/manage/tag/add', (req, res) => {
  const { name, color } = req.body;
  TagModel.create({ name, color, blogs_id: [] })
    .then((tag) => {
      console.log('Add tag successfully: ', tag);
      res.send({ status: 0, data: tag });
    })
    .catch((error) => {
      console.error('Add tag error', error);
      if (error.code === 11000) {
        res.send({
          status: 1,
          msg: 'Duplicated tag error, please use another name',
        });
      } else {
        res.send({ status: 1, msg: 'Add tag error, please try again' });
      }
    });
});

router.post('/manage/tag/delete', (req, res) => {
  const { tag_id } = req.body;
  TagModel.findOneAndUpdate({ _id: tag_id }, { is_deleted: true })
    .then(() => {
      res.send({ status: 0 });
    })
    .catch((error) => {
      console.error('Delete tag error', error);
      res.send({
        status: 1,
        msg: 'Failed to delete the tag, please try again.',
      });
    });
});

router.post('/manage/tag/update', (req, res) => {
  const { tag_id, name, color } = req.body;
  TagModel.findOneAndUpdate({ _id: tag_id }, { name, color })
    .then(() => {
      res.send({ status: 0 });
    })
    .catch((error) => {
      console.error('Update tag error: ', error);
      res.send({
        status: 1,
        msg: 'Failed to update the tag, please try again.',
      });
    });
});

router.post('/manage/blog/add', async (req, res) => {
  const { title, content, category_id, tags_id, desc } = req.body;
  try {
    const blog = await BlogModel.create({
      title,
      content,
      category_id,
      tags_id,
      desc,
    });
    await CategoryModel.findOneAndUpdate(
      { _id: category_id },
      { $inc: { blog_num: 1 } },
    );
    await TagModel.find({ _id: { $in: blog.tags_id } }).updateMany({
      $push: { blogs_id: ObjectId(blog._id) },
      $inc: { blog_num: 1 },
    });
    await CategoryModel.findOneAndUpdate(
      { _id: category_id },
      { $push: { blogs_id: ObjectId(blog._id) } },
    );
    console.log('Add new blog successfully: ', blog);
    res.send({ status: 0, data: blog });
  } catch (error) {
    console.error('Add new blog error', error);
    res.send({ status: 1, msg: 'Add new blog error, please try again.' });
  }
});

router.get('/manage/blog/list', (req, res) => {
  BlogModel.find({ is_deleted: false }, { content: 0 })
    .then((blogs) => {
      CategoryModel.find().then((categories) => {
        TagModel.find().then((tags) => {
          res.send({ status: 0, data: { blogs, categories, tags } });
        });
      });
    })
    .catch((error) => {
      console.error('Failed to get blog list', error);
      res.send({
        status: 1,
        msg: 'Failed to get the category list, please try again.',
      });
    });
});

router.post('/manage/blog/updateStatus', (req, res) => {
  const { blog_id, status } = req.body;
  BlogModel.findOneAndUpdate({ _id: blog_id }, { status })
    .then((oldBlog) => {
      res.send({ status: 0 });
    })
    .catch((error) => {
      console.error('Blog status update error', error);
      res.send({
        status: 1,
        msg: 'Blog status update error, please try again',
      });
    });
});

router.post('/manage/blog/delete', (req, res) => {
  const { blog_id } = req.body;
  BlogModel.findOneAndUpdate({ _id: blog_id }, { is_deleted: true })
    .then((oldBlog) => {
      CategoryModel.findOneAndUpdate(
        { _id: oldBlog.category_id },
        { $inc: { blog_num: -1 } },
      ).then(() => {
        TagModel.find({ _id: { $in: oldBlog.tags_id } })
          .updateMany({
            $inc: { blog_num: -1 },
          })
          .then(() => {
            res.send({ status: 0 });
          });
      });
    })
    .catch((error) => {
      console.error('Blog delete error', error);
      res.send({ status: 1, msg: 'Blog delete error, please try again' });
    });
});

router.post('/manage/blog/edit', async (req, res) => {
  const { blog_id, title, category_id, tags_id, content, desc } = req.body;
  try {
    const oldBlog = await BlogModel.findOneAndUpdate(
      { _id: blog_id },
      {
        title,
        category_id,
        tags_id,
        content,
        desc,
        last_modify_time: Date.now(),
      },
    );
    if (category_id !== oldBlog.category_id) {
      await CategoryModel.findOneAndUpdate(
        { _id: category_id },
        { $inc: { blog_num: 1 } },
      );
      await CategoryModel.findOneAndUpdate(
        { _id: oldBlog.category_id },
        {
          $inc: { blog_num: -1 },
        },
      );
    }
    const new_tags_id = tags_id.filter(
      (tag_id) => !oldBlog.tags_id.includes(tag_id),
    );
    const removed_tags_id = oldBlog.tags_id.filter(
      (tag_id) => !tags_id.includes(tag_id),
    );
    await TagModel.find({ _id: { $in: new_tags_id } }).updateMany({
      $push: { blogs_id: ObjectId(blog_id) },
      $inc: { blog_num: 1 },
    });
    await TagModel.find({ _id: { $in: removed_tags_id } }).updateMany({
      $pull: { blogs_id: ObjectId(blog_id) },
      $inc: { blog_num: -1 },
    });
    res.send({ status: 0 });
  } catch (error) {
    console.error('Blog edit error', error);
    res.send({ status: 1, msg: 'Blog edit error, please try again' });
  }
});

router.get('/manage/blog/blogContentById', (req, res) => {
  const { blog_id } = req.query;
  BlogModel.findById(blog_id)
    .then((blog) => {
      res.send({ status: 0, data: blog.content });
    })
    .catch((error) => {
      console.error('Get blog content by id error: ', error);
      res.send({
        status: 1,
        msg: 'Failed to get the blog content, please try again.',
      });
    });
});

router.get('/public/blog/blogById', (req, res) => {
  const { blog_id } = req.query;
  BlogModel.findById(blog_id)
    .then((blog) => {
      res.send({ status: 0, data: blog });
    })
    .catch((error) => {
      console.error('Get blog by id error: ', error);
      res.send({
        status: 1,
        msg: 'Failed to get the blog, please try again.',
      });
    });
});

router.get('/public/blog/blogListByIds', (req, res) => {
  let { blogs_id } = req.query;
  // const blogs_id = req.query.blogs_id.reduce(
  //   (prev, curr) => prev.push(ObjectId(curr)),
  //   [],
  // );
  blogs_id = blogs_id.reduce((prev, curr) => {
    prev.push(ObjectId(curr));
    return prev;
  }, []);

  BlogModel.find(
    { _id: { $in: blogs_id }, is_deleted: false, status: 1 },
    { content: 0 },
  )
    .then((blogs) => {
      res.send({ status: 0, data: blogs });
    })
    .catch((error) => {
      console.error('Failed to get blog list', error);
      res.send({
        status: 1,
        msg: 'Failed to get the blog list, please try again.',
      });
    });
});

router.get('/public/tag/tagsByIds', (req, res) => {
  const { tags_id } = req.query;
  TagModel.find({ _id: { $in: tags_id }, is_deleted: false })
    .then((tags) => {
      res.send({ status: 0, data: tags });
    })
    .catch((error) => {
      console.error('Failed to get tag list', error);
      res.send({
        status: 1,
        msg: 'Failed to get the tag list, please try again.',
      });
    });
});

router.get('/public/tag/tagByTagName', (req, res) => {
  const { name } = req.query;
  TagModel.findOne({ name: name, is_deleted: false })
    .then((tag) => {
      res.send({ status: 0, data: tag });
    })
    .catch((error) => {
      console.error('Failed to get tag', error);
      res.send({
        status: 1,
        msg: 'Failed to get the tag, please try again.',
      });
    });
});

module.exports = router;
