"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userModel_1 = require("../model/userModel");
const User = mongoose.model('User', userModel_1.UserSchema);
class AuthController {
}
AuthController.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let { username, password } = req.body;
    if (!(username && password)) {
        res.status(400).send();
    }
    var user = yield User.findOne({ 'username': username }, (err) => {
        if (err) {
            res.status(401).send({ message: "fail 401" });
        }
    });
    const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });
    res.send({ token: token });
});
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map