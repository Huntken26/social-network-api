const { Schema, model, Types } = require("mongoose");

//Originally had a full model for reactionSchema, but had to change it to a subdocument
//https://mongoosejs.com/docs/subdocs.html
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      //Default value is set to a new ObjectId
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
      timestamps: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

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
        get: timestamp => timestamp
      },

      username:
        {
          type: String,
          required: true,
        },

      reactions: [
       reactionSchema
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

    //Created a virtual which retrieves the length of the reactions upon 'get' method query
    //got virtual/mongoose help from https://mongoosejs.com/docs/guide.html#virtuals
    thoughtSchema.virtual("reactionCount").get(function () {
        return this.reactions.length;
      });
      
      const Thought = model("Thought", thoughtSchema);
      
      module.exports = Thought;