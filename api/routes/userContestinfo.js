const express=require('express');
const router=express.Router();

const {getContestData}=require('../controllers/userContestinfoController')
const {getContestList}=require('../controllers/clistController')

router.get('/profile',getContestData);
router.post('/contest-list',getContestList);

module.exports=router;