const UserModel = require("@models/User.model.js")
const CustomError = require('@config/CustomError');
const jwt = require('jsonwebtoken');

exports.signUp = async (name, email, password) => {

    let user = await UserModel.findOne({ email: email });
    if (user) throw new CustomError(403, 'User already exists with this email');
    user = new UserModel({
        name,
        email,
        password
    })
    user = await user.save();
    user.password = undefined;
    const token = jwt.sign({_id:user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });
    return {
        token,
        name:user.name
    }

}

exports.signIn = async (email, password) => {
    let user = await UserModel.findOne({ email: email, password:password });
    if(!user) throw new CustomError(404, 'Wrong Email or Password!');
    const token = jwt.sign({_id:user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });
    return {
        token,
        name:user.name
    }
}


