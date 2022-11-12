const UserModel = require("@models/User.model.js")
const CustomError = require('@config/CustomError');

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
    return user;

}

exports.signIn = async (recoveryCode, newPassword, email) => {

}


