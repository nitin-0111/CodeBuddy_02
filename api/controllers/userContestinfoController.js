const Profile = require("../models/Profile");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  getLeecodeData,
  getCodeforcesData,
} = require("../Services/getContestData");

const User = require("../models/User");

const getContestData = async (req, res) => {
  let { leetcodeId, codeforceId, userId } = req.query;
    
  // console.log(req.query,leetcodeId,codeforceId);
  // let user = await User.findOne({ _id: userId });
  // if(!user){
  //   console.log('no useer');
  // }
  // if (!leetcodeId) {
  //   leetcodeId = user.contestId.leetcode;
  // } else {
  //   user.contestId.leetcode = leetcodeId;
  // }
  // if (!codeforceId) {
  //   codeforceId = user.contestId.codeforces;
  // } else {
  //   user.contestId.codeforces = codeforceId;
  // }
  // await user.save();

  let data = { leetcode: null, codeforce:null };
  if (leetcodeId) {
    data.leetcode = await getLeecodeData(leetcodeId);
  }

  if (codeforceId) {
    data.codeforce = await getCodeforcesData(codeforceId);
  }
  // console.log("data",data);

  await res.status(StatusCodes.OK).json({ ...data });
};

module.exports = { getContestData };
