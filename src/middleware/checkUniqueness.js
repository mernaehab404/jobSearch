import { Company } from "../../database/models/company.model.js";
import { User } from "../../database/models/user.model.js";
import bcrypt from "bcrypt";

export const checkUniqueness = async (req, res, next) => {
  const { email, mobileNumber, companyName, companyEmail } = req.body;

  try {
    // Check if email is unique
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "Email already exists" });
      req.body.password = bcrypt.hashSync(req.body.password, 8);
    }

    // Check if mobileNumber is unique
    if (mobileNumber) {
      const existingUser = await User.findOne({ mobileNumber });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Mobile number already exists" });
      }
    }
    // Check if companyName is unique
    if (companyName) {
      const existingUser = await Company.findOne({ companyName });
      if (existingUser) {
        return res.status(400).json({ message: " companyName already exists" });
      }
    }

    // Check if companyEmail is unique
    if (companyEmail) {
      const existingUser = await Company.findOne({ companyEmail });
      if (existingUser) {
        return res.status(400).json({ message: " companyEmail already exists" });
      }
    }
    // If no conflicts, proceed to next middleware
    next();
  } catch (error) {
    console.error("Uniqueness check error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
