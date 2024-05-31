const express = require("express");
const {
  createArticle,
  getAllArticle,
  updateArticle,
  viewArticle,
  deleteArticle,
} = require("../controllers/article-controller");
const article_routes = express.Router();
article_routes.post("/add-article", createArticle);
article_routes.get("/all-article", getAllArticle);
article_routes.get("/view-article/:id", viewArticle);
article_routes.patch("/update-article/:id", updateArticle);
article_routes.delete("/delete-article/:id", deleteArticle);

module.exports = article_routes;
