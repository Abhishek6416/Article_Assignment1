// const FileUploadOnCloudinary = require("../config/cloudinary-config");
const { HashPassword, ComparePassword } = require("../helpers/hash-password");
const { CreateError } = require("../middleware/ErrorHandle");
const UserModel = require("../models/user-schema");

const REGISTER_USER_CONTROLLER = async (req, res, next) => {
   console.log("user",req.body)
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return next(
      CreateError("Please fill all the details.", 500, "register controller")
    );
  try {
    const existUser = await UserModel.findOne({ email });
    if (existUser)
      return next(CreateError("User already exist", 500, "reg controller"));
  
    const hashPassword = await HashPassword(password);
    const newUser = new UserModel({
      ...req.body,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "user register successfull",
    });
  } catch (error) {
    return next(CreateError(error.message, 500, "reg contro"));
  }
};
const LOGIN_USER_CONTROLLER = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existUser = await UserModel.findOne({ email });
    if (!existUser)
      return next(CreateError("User not exist", 500, "login cntroler"));
    const matchPassword = await ComparePassword(password, existUser?.password);
    if (!matchPassword)
      return next(CreateError("Wrong credential", 400, "login controller"));
    return res.status(200).json({
      success: true,
      message: "User login successfull",
      User: {
        name: existUser?.name,
        // image: existUser?.imageUrl,
        id: existUser?._id,
      },
    });
  } catch (error) {
    return next(CreateError(error.message, 500, "login controller"));
  }
};
module.exports = { REGISTER_USER_CONTROLLER, LOGIN_USER_CONTROLLER };
