const { Schema, model } = require('mongoose');
//const dateFormat = require('../utils/seed');
const reactionSchema = require("./Reaction")
function dateFormat(timestamp){
 return timestamp.getMonth() 
}
// Schema to create Post model
const thoughtSchema = new Schema(
    {
      thoughtText: 
       {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
        },
        createdAt:
        {
         type: Date,
         default: Date.now,
         get: timestamp => dateFormat(timestamp)
        },
        username: 
        {
          type: String,
          required: true,
        },  

        reactions: [reactionSchema]
        },
        {
        toJSON: {
          getters: true
        },
          id: false
        }
    );
//Create a virtual called 'reactionCount' that retrieves the length of the thought's 'reactions' array field on query.
thoughtSchema.virtual('reactionCount')
// Getter
.get(function() {
   return this.reactions.length;
});

// Create a Thought model using the Thought schema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;




        



