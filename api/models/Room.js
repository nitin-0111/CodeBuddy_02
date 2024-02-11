const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    RoomId: {
      type: String,
      required: [true, "Please provide a Room ID"],
      minlength: 4,
    },
    handles: {
      type: [String],
      required: [true, "Please provide a handles ID"],
    },
    Contest: {
      num: { type: Number, required: true },
      min: { type: Number, default: 1000 },
      max: { type: Number, default: 2000 },
      duration: { type: Number, default: 90 },
    },
    questions: {
      type: [
        {
          rating: { type: Number },
          index: { type: String },
          name: { type: String },
        }
      ], // Array of arrays with specific types
      // required: true,
    },
    Start_time: {
      type: Number, // timeStamps
      required: [true, "Please provide a start time"],
    },
    CreatedBy:{
      type:String,
      default:"----"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
