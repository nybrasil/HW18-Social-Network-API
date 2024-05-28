const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
      try {
        const users = await User.find().select('-__v');
        
        res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single user by ID
    async getUserById(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('friends')
          .populate('thoughts');
          
          if (!user) {
            return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.json(user);
      } catch (err) {
      res.status(500).json(err);
      }
  },

     // Create a new user
     async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
          } catch (err) {
            res.status(500).json(err);
          }
  },
      // Update a user
      async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
            );

          if (!user) {
              return res.status(404).json({ message: 'No user found with that ID' });
            }
      
            res.json(user);
          } catch (err) {
            res.status(500).json(err);
          }
        },

            
        // Delete a user and associated thought
      async deleteUser(req, res) {
         try {
           const user = await User.findOneAndRemove({ _id: req.params.userId });
              if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
                }
                res.json({ message: 'User deleted successfully' });
        } 
         catch (err) {
                    res.status(500).json(err);
                    }
                },
        // Add a friend to a user
        async addFriend(req, res) {
           try {
             const user = await User.findOne({ _id: req.params.userId });
                if (!user) {
                  return res.status(404).json({ message: 'No user found with that ID' });
                  }
             const friend = await User.findOne({ _id: req.params.friendId });
                if (!friend) {
                  return res.status(404).json({ message: 'No friend found with that ID' });
                  }
                  user.friends.push(friend._id);
                  await user.save();
                    res.json({ message: 'Friend added successfully' });
             } 
             catch (err) {
                  res.status(500).json(err);
            }
                },

        // Remove a friend from a user
        async removeFriend(req, res) {
            try {
             const user = await User.findOne({ _id: req.params.userId });
                if (!user) {
                  return res.status(404).json({ message: 'No user found with that ID' });
                  }
             const friend = await User.findOne({ _id: req.params.friendId });
                if (!friend) {
                   return res.status(404).json({ message: 'No friend found with that ID' });
                   }
                user.friends.pull(friend._id);
                await user.save();
                res.json({ message: 'Friend removed successfully' });
            } 
                catch (err) {
                res.status(500).json(err);
            }
                                    
        },
                                    
                };

                



            





         

