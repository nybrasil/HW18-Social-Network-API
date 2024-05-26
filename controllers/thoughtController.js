const { Thought, User } = require('../models');

module.exports = {
  // Function to get all of the thoughts by invoking the find() method with no arguments.
  // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
    async getThought(req, res) {
        try {
          const Thoughts = await Thought.find();
          res.json(Thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },
     // Gets a single thought using the findOneAndUpdate method. We pass in the ID of the thought and then respond with it, or an error if not found
      async getSingleThought(req, res) {
        try {
          const Thought = await Thought.findOne({ _id: req.params.thoughtId });
    
          if (!Thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
    
          res.json(Thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Creates a new thought. Accepts a request body with the entire thought object.
      // Because thought are associated with Users, we then update the User who created the thought and add the ID of the thought to the thought array
      async createThought(req, res) {
        try {
          const Thought = await Thought.create(req.body);
          const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thought: Thought._id } },
            { new: true }
          );

          if (!user) {
            return res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          }  
          
          res.json('Created Thought 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
    // Updates and thought using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
    async updateThought(req, res) {
      try {
      const Thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!Thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(Thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
    },
    // Deletes a thoght from the database. Looks for a thought by ID.
    // Then if the thought exists, we look for any users associated with the thought based on he thought ID and update the thought array for the User.
    async deleteThought(req, res) {
      try {
        const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }

        const user = await User.findOneAndUpdate(
          { thought: req.params.thoughtId },
          { $pull: { Thoughts: req.params.createThoughtId } },
          { new: true }
        );

        if (!user) {
          return res.status(404).json({
            message: 'Thought created but no user with this id!',
          });
        }

        res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Adds a reaction to an thought. This method is unique in that we add the entire body of the thought rather than the ID with the mongodb $addToSet operator.
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
 // Remove reation from a thought. This method finds the thought based on ID. It then updates the reation array associated with the thought in question by removing it's reationId from the reations array.
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
