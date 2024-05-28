const { Schema, Types } = require("mongoose");
function dateFormat(timestamp){
  return timestamp.getMonth()  
}
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
      
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true,
    },
      id: false
  }
);

  module.exports = reactionSchema;

  //This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.


      