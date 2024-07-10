import { User } from "../../database/models/user.model.js";
import { updatePasswordSchema, updateUserSchema } from "../validator/UserValidation.js";
import bcrypt from "bcrypt";

const updateUser = async (req, res) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {return res.status(400).json({ error: error.details[0].message });}
  const userId = req.user.userId; // Assuming userId is obtained from authentication middleware
  try {
    // Update user fields based on request body
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Remove the password from the response
    updatedUser.password = undefined;

    res
      .status(200)
      .json({ message: "Account updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update account error:", error);
    res
      .status(500)
      .json({ message: "Failed to update account", error: error.message });
  }
};

const deleteUser = async (req, res) => {
    const userId = req.user.userId;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({ message: 'Failed to delete account', error: error.message });
    }
};

const getUser= async (req,res)=>{
    const userId = req.user.userId;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'get Account  successfully' ,user});
    } catch (error) {
        console.error('get account error:', error);
        res.status(500).json({ message: 'Failed to get account', error: error.message });
    }
}
const getUserProfile = async(req,res)=>{
    const userId = req.params.userId || req.query.userId;

    if (!userId) {
        return res.status(400).json({ message: 'UserId is required' });
    }

    try {
        const user = await User.findById(userId).select('-password'); // Exclude password field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User profile retrieved successfully', user });
    } catch (error) {
        console.error('Get user profile error:', error);
        res.status(500).json({ message: 'Failed to retrieve user profile', error: error.message });
    }
}

const updatePassword = async (req, res) => {
    const { error } = updatePasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    const { userId, oldPassword, newPassword } = req.body;
  
    try {
      // Find user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the old password is correct
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect old password' });
      }
  
      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ message: 'Failed to update password', error: error.message });
    }
  };
export { updateUser ,deleteUser,getUser,getUserProfile ,updatePassword};
