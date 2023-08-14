const { nanoid } = require("nanoid");

const { StatusCodes } = require("http-status-codes");

const Room = require("../models/Room");
const getProblems = require("../Services/GetProblems");
const getRoomId = async (req, res) => {
  try {
    const id = nanoid(5);
    res.status(StatusCodes.OK).json({ roomId: id });
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "something weant wrong in getting id" });
  }
};

const createRoom = async (req, res) => {
  // res.send(null);
  try {
    // console.log(req.body);
    // console.log(req.body);
    const { RoomId, Contest, Start_time } = req.body;
    const room = await Room.findOne({ RoomId: RoomId });
    if (room) {
      room.Contest = Contest;
      room.Start_time = Start_time;
      await room.save();
      // console.log("save", room);
      res.status(StatusCodes.OK).json(room);
    } else {
      const room = await Room.create(req.body);
      // console.log(room);
      res.status(StatusCodes.CREATED).json(room);
    }
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "something went wrong in Create Room" });
  }
};

const getRoomProbs = async (req, res) => {
  const { RoomId } = req.params;
  // console.log(RoomId,req.query)
  try {
    const room = await Room.findOne({ RoomId: RoomId });
    if (room) {
      // console.log(room);
      res.status(StatusCodes.OK).json(room);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "err getRoom probs" });
    }
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "something weant wrong in getting id" });
  }
};

const publishContest = async (req, res) => {
  const { userHandles, RoomId } = req.body;

  try {
    const room = await Room.findOne({ RoomId: RoomId });
    if (room) {
      const problems = await getProblems(userHandles, room.Contest);
      //  console.log(typeof problems)
      const questions = problems.map((problem) => ({
        rating: problem[0],
        index: problem[1],
        name: problem[2],
      }));
      // console.log(questions);
      room.questions = questions;
      room.handles = userHandles;
      await room.save();
    }
  } catch (err) {
    console.log(err);
  }

  res.status(StatusCodes.OK).json({ msg: "test" });
};

const getContestList = async (req, res) => {
  const { handle } = req.params;
  try {
    const data = await Room.aggregate([
      { $match: { handles: handle } },
      {
        $project: {
          _id: 0,
          RoomId: 1,
          Start_time: 1,
          Contest: 1,
          CreatedBy: 1,
        },
      },
      { $sort: { Start_time: -1 } },
    ]);

    console.log(handle, data);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.log(" eeeasdff", error);
  }
};
module.exports = {
  getRoomId,
  createRoom,
  getRoomProbs,
  publishContest,
  getContestList,
};
