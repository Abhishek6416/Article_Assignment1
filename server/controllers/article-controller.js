// const { createError } = require("../middleware/errorHandle");
const { CreateError } = require("../middleware/ErrorHandle");
const Article = require("../models/article-schema");

// create article
const createArticle = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return next(
      CreateError("Please add all details", 500, "create artcle controller")
    );
  }
  try {
    const addArticle = new Article({ title, content });
    const article = await addArticle.save();
    return res.status(200).json({
      success: true,
      message: "artcle created",
      article,
    });
  } catch (error) {
    return next(CreateError(error.message, 500, "create artcile controller"));
  }
};

// get all article
const getAllArticle = async (req, res, next) => {
  try {
    const article = await Article.find({});
    if (!article) {
      return next(
        CreateError("No Article Found", 400, "get article controller")
      );
    }
    return res.status(200).json({
      success: true,
      message: "fetch all data successfully",
      article,
    });
  } catch (error) {
    return next(CreateError(error.message, 500, "get all article controller"));
  }
};

// get single article | view article
const viewArticle = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(CreateError("Id is not found", 500, "view controller"));
  try {
    const article = await Article.findOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "get single article",
      article,
    });
  } catch (error) {
    return next(CreateError(error.message, 500, "view article controller"));
  }
};

// update article
const updateArticle = async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    return next(
      CreateError("Please provide correct id", 500, "update controller")
    );
  try {
    const updateArticle = await Article.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "article update",
      updateArticle,
    });
  } catch (error) {
    return next(CreateError(error.message, 500, "update article controller"));
  }
};

// delete article
const deleteArticle = async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    return next(
      CreateError("Please provide correct id", 500, "delete controller")
    );
  try {
    const deleteItem = await Article.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "item delted successfully",
    });
  } catch (error) {
    return next(CreateError(error.message, 500, "delete controller"));
  }
};

module.exports = {
  createArticle,
  getAllArticle,
  updateArticle,
  viewArticle,
  deleteArticle,
};
