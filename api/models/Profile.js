const mongoose = require("mongoose");

const CodeforcesUserSchema = mongoose.Schema({
  userName: { type: String, required: true },
  rating: {
    type: Number,
    default: 800,
  },
  maxRating: {
    type: Number,
    default: 800,
  },
  rank: {
    type: String,
    default: "Pupil",
  },
  maxRank: {
    type: String,
    default: "Pupil",
  },
});

const LeetCodeUserSchema = mongoose.Schema({
  userName: { type: String, required: true },
  rating: {
    type: Number,
    default: 1500,
  },
  attendedContestsCount:{
    type:Number,
    default:0
  },
  maxRating: {
    type: Number,
    default: 1500,
  },
  globalRanking: {
    type: Number,
    default: 0,
  },
  totalParticipants: {
    type: Number,
    default: 0,
  },
  topPercentage: {
    type: Number,
    default: 100,
  },
});
const ProfileSchema = new mongoose.Schema(
  {
    codeforces: CodeforcesUserSchema,
    leetcode: LeetCodeUserSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
