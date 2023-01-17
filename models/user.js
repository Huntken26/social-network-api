const { Schema, model, Types } = require("mongoose");

//Schema to create a new User model
const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },

      email: { 
        type: String,
        required: true,
        unique: true,
        //got validation help from https://masteringjs.io/tutorials/mongoose/mongoose-validate-unique-email
        match: [/.+\@.+\..+/],
      },

      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought",
        },
      ],

      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],

    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    } 
    );

    //Created a virtual which retrieves the length of the friends upon 'get' method query
    //got virtual/mongoose help from https://mongoosejs.com/docs/guide.html#virtuals
    userSchema.virtual("friendCount").get(function () {
        return this.friends.length;
      });
      
      const User = model("User", userSchema);
      
      module.exports = User;