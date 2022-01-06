const Posts = require("../database/models/post");
const utils = require("../../utils/utils");
const { postSchema, updatePostSchema } = require("../../utils/joivalidator");


exports.createPost = async (req, res) => {
  try {
    const postExist = await Posts.findOne(
      { title: req.body.title },
      { _id: 0, title: 1 }
    );
    if (postExist) {
      res.status(409).json({
        message: "Post already exist",
      });
    } else {
      const newPost = new Posts({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      });
      const result = await postSchema.validate(req.body);
      if (!result.error) {
        newPost.save();
        res.status(201).json({
          message: "post created successfully",
        });
      } else {
        res.status(401).json({
          error: result.error.details[0].message,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

exports.postList = async (req, res) => {
  try {
    const allpost = await Posts.find({});
    if (allpost && allpost.length) {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;

      const results = utils.pagination(allpost, page, limit);

      res.status(201).json({
        message: "list of all posts",
        results,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const _id = req.params.id;
    const updates = req.body;
    const result = await updatePostSchema.validate(req.body);
    if (!result.error) {
      const result = await Posts.findByIdAndUpdate(_id, updates, { new: true });
      res.status(201).json({
        message: "Post updated successfully",
        updatedPost: result,
      });
    } else {
      res.status(401).json({
        error: result.error.details[0].message,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

