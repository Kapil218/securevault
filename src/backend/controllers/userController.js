import { User } from "../models/userModel.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    await User.create({ name: name, email: email, password: password });
    res.status(201).json({
      status: "success",
      name,
      email,
      password,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });
  if (!email || !password) {
    res.status(200).json({
      status: "fail",
      message: "please provide email and passowrd",
    });
  } else if (!user || user.password != password) {
    res.status(200).json({
      status: "fail",
      message: "Invalid email or password",
    });
  } else {
    res.status(200).json({
      status: "success",
      user,
    });
  }
};
