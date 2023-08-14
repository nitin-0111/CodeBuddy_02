const express = require("express");
const  router = express.Router();

const {getRoomId,createRoom,getRoomProbs,publishContest,getContestList}=require('../controllers/vContest')

router.get('/getRoomId',getRoomId);
router.post('/createRoom',createRoom);
router.get('/getRoomProbs/:RoomId',getRoomProbs);
router.post('/publishContest',publishContest);
router.get('/getContestList/:handle',getContestList);

module.exports=router;