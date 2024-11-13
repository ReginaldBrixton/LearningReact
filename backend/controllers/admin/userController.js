const User = require('../../models/User');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, role, status } = req.body;
      const newUser = new User({
        name,
        email,
        role,
        status,
        password: 'defaultPassword123' // In production, generate a random password
      });
      
      await newUser.save();
      res.status(201).json({ 
        message: 'User created successfully',
        user: { ...newUser.toObject(), password: undefined }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, email, role, status } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, role, status },
        { new: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController; 