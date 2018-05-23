"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("../models/User");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    UserRouter.prototype.all = function (req, res) {
        User_1.default.find()
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    UserRouter.prototype.one = function (req, res) {
        var username = req.params.username;
        User_1.default.findOne({ username: username })
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    UserRouter.prototype.create = function (req, res) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var user = new User_1.default({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password
        });
        user.save()
            .then(function (data) {
            res.status(201).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    UserRouter.prototype.update = function (req, res) {
        var username = req.params.username;
        User_1.default.findOneAndUpdate({ username: username }, req.body)
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    UserRouter.prototype.delete = function (req, res) {
        var username = req.params.username;
        User_1.default.findOneAndRemove({ username: username })
            .then(function () {
            res.status(204).end();
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    // set up our routes
    UserRouter.prototype.routes = function () {
        this.router.get('/', this.all);
        this.router.get('/:username', this.one);
        this.router.post('/', this.create);
        this.router.put('/:username', this.update);
        this.router.delete('/:username', this.delete);
    };
    return UserRouter;
}());
var userRoutes = new UserRouter();
userRoutes.routes();
exports.default = userRoutes.router;
//# sourceMappingURL=UserRouter.js.map