import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../database/models/user.model.js";
import { signinSchema, signupSchema } from "../validator/AuthValidation.js";



const signup = async (req, res) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    let newUser = new User(req.body);
    await newUser.save(); // Use save to trigger the pre-save hook
    newUser.password = undefined; // Remove the password from the response
    res.status(201).json({
      message: "User added successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

const signin = async (req, res) => {
  const { error } = signinSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { identifier, password } = req.body;
  try {
    // Find user by email or mobileNumber
    const user = await User.findOne({
      $or: [{ email: identifier }, { mobileNumber: identifier }],
    });

    //check email/mobilenumber
    if (!user)
      return res
        .status(401)
        .json({ message: "incorrect email or mobile number" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Update status to online
    user.status = "online";
    await user.save();

    // Generate JWT
    jwt.sign(
      { userId: user._id, name: user.username, role: user.role },
      "myNameMerna",(err, token) => {res.json({ message: "login successfully", token })});
  }
   catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Signin failed", error });
  }
};



export { signup, signin };
