const { Thought, User } = require('../models');

module.exports = {
    async getThought(req, res) {
        try {
          const Thoughts = await Thought.find();
          res.json(Thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },

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

  async addTag(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { tags: req.body } },
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

  async removeTag(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { tags: { tagId: req.params.tagId } } },
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
