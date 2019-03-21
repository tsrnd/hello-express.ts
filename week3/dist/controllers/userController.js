"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userModel_1 = require("../model/userModel");
const User = mongoose.model('User', userModel_1.UserSchema);
class UserController {
    addNewUser(req, res) {
        let newUser = new User(req.body);
        newUser.save((err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    }
    getAllUsers(req, res) {
        User.find({}, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    }
    getUser(req, res) {
        User.findById(req.params.userID, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    }
    updateUser(req, res) {
        User.findByIdAndUpdate({ userID: req.params.userID }, req.body, { new: true }, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    }
    deleteUser(req, res) {
        User.remove({ userID: req.params.userID }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'delete user successful' });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map