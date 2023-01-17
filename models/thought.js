const { Schema, model, Types } = require("mongoose");
const Reaction = require("./Reaction");

//Schema to create a new thought model
const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
      },

      createdAt: {
        type: Date,
        default: Date.now,
        timestamps: true,
        get: (timestamp),
      },

      username:
        {
          type: String,
          required: true,
        },

      reactions: [
       Reaction
      ],

    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    } 
    );

    //Created a virtual which retrieves the length of the friends upon 'get' method query
    //got virtual/mongoose help from https://mongoosejs.com/docs/guide.html#virtuals
    thoughtSchema.virtual("friendCount").get(function () {
        return this.friends.length;
      });
      
      const Thought = model("Thought", thoughtSchema);
      
      module.exports = Thought;