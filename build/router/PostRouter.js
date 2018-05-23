"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Post_1 = require("../models/Post");
var PostRouter = /** @class */ (function () {
    function PostRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    // get all of the posts in the database
    PostRouter.prototype.all = function (req, res) {
        Post_1.default.find()
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.json({ error: error });
        });
    };
    // get a single post by params of 'slug'
    PostRouter.prototype.one = function (req, res) {
        var slug = req.params.slug;
        Post_1.default.findOne({ slug: slug })
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    // create a new post
    PostRouter.prototype.create = function (req, res) {
        var title = req.body.title;
        var slug = req.body.slug;
        var content = req.body.content;
        var featuredImage = req.body.featuredImage;
        var category = req.body.category;
        var published = req.body.published;
        if (!title || !slug || !content) {
            res.status(422).json({ message: 'All Fields Required.' });
        }
        var post = new Post_1.default({
            title: title,
            slug: slug,
            content: content,
            featuredImage: featuredImage,
            category: category,
            published: published
        });
        post.save()
            .then(function (data) {
            res.status(201).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    // update post by params of 'slug'
    PostRouter.prototype.update = function (req, res) {
        var slug = req.body.slug;
        Post_1.default.findOneAndUpdate({ slug: slug }, req.body)
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    // delete post by params of 'slug'
    PostRouter.prototype.delete = function (req, res) {
        var slug = req.body.slug;
        Post_1.default.findOneAndRemove({ slug: slug })
            .then(function () {
            res.status(204).end();
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    PostRouter.prototype.routes = function () {
        this.router.get('/', this.all);
        this.router.get('/:slug', this.one);
        this.router.post('/', this.create);
        this.router.put('/:slug', this.update);
        this.router.delete('/:slug', this.delete);
    };
    return PostRouter;
}());
exports.PostRouter = PostRouter;
var postRoutes = new PostRouter();
postRoutes.routes();
exports.default = postRoutes.router;
//# sourceMappingURL=PostRouter.js.map