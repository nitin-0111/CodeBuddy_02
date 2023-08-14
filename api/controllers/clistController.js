const axios = require("axios");
const { StatusCodes } = require("http-status-codes");

const apiUrl = `https://clist.by:443/api/v2/contest/?username=free&api_key=${process.env.CLIST_API}&format=json&order_by=start`;
var hosts = `codechef.com%2Ccodeforces.com%2Cgeeksforgeeks.org%2Chackerearth.com%2Cleetcode.com%2Ctopcoder.com%2Catcoder.jp%2Ccodingcompetitions.withgoogle.com`;

const getContestList = async (req, res) => {
  let { host, today, duration } = req.body;
  if (!duration) {
    duration = 60 * 60 * 24;
  } else if (duration === 2) {
    duration = 60 * 60 * 2;
  } else if (duration === 3) {
    duration = 60 * 60 * 3;
  } else {
    duration = 60 * 60 * 24;
  }
  if (!today) {
    today = false;
  }

  // host = [
  //   "codeforces.com",
  //   "codechef.com",
  //   "atcoder.jp",
  //   "leetcode.com",
  //   "codingcompetitions.withgoogle.com",
  //   "hackerearth.com",
  //   "geeksforgeeks.org",
  //   "topcoder.com",
  // ];
  // console.log("req body 45",req.body);

  console.log(today, duration, host);
  var {
    cur_time,
    tomorrow,
    day30,
    curr_time_api_formate,
    day30_time_api_formate,
  } = timeCalculation();
  try {
    var reqUrl = `${apiUrl}&&resource=${hosts}&start__gt=${curr_time_api_formate}&end__lt=${day30_time_api_formate}`;
    // console.log(reqUrl);

    let result = await axios.get(reqUrl);

    let data = result.data.objects;
    //  console.log(data)
    data = data.map((contest) => {
      var start_time = new Date(contest.start + `.000Z`);
      var end_time = new Date(contest.end + ".000Z");
      var newData;
      if (today) {
        // console.log(start_time,tomorrow, start_time<tomorrow);
        if (
          host.includes(contest.resource) &&
          start_time < tomorrow &&
          contest.duration <= duration
        ) {
          var { timeDuration, date, startTime, conEvent } =
            contestTime(contest);
          newData = {
            id: contest.id,
            conEvent: conEvent,
            website: contest.resource,
            href: contest.href,
            date: date,
            startTime: startTime,
            timeDuration: timeDuration,
          };
        }
      } else {
        if (host.includes(contest.resource) && contest.duration <= duration) {
          var { timeDuration, date, startTime, conEvent } =
            contestTime(contest);
          newData = {
            id: contest.id,
            conEvent: conEvent,
            website: contest.resource,
            href: contest.href,
            date: date,
            startTime: startTime,
            timeDuration: timeDuration,
          };
        }
      }

      return newData;
    });

    data = data.filter((newData) => newData != null);
    console.log(data);
    res.status(StatusCodes.OK).json({ data });
  } catch (err) {
    // console.log("err", err);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please Try again after sometime..." });
  }
};

const timeCalculation = () => {
  var cur_time = new Date();
  const curr_time_api_formate =
    cur_time.toISOString().substring(0, 11) +
    cur_time.toISOString().substring(11, 19);
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(00, 00, 00);
  var day30 = new Date();
  day30.setDate(day30.getDate() + 30);
  day30.setHours(0, 0, 0, 0);
  console.log(day30);

  var day30_time_api_formate =
    day30.toISOString().substring(0, 11) +
    day30.toISOString().substring(11, 19);

  return {
    cur_time,
    tomorrow,
    day30,
    curr_time_api_formate,
    day30_time_api_formate,
  };
};

const contestTime = (contest) => {
  const minutes = (parseInt(contest.duration) / 60) % 60;
  const hours = parseInt((parseInt(contest.duration) / 3600) % 24);
  const days = parseInt(parseInt(contest.duration) / 3600 / 24);
  var timeDuration = ``;
  if (days > 0) timeDuration += `${days} days `;
  if (hours > 0) timeDuration += `${hours} hours `;
  if (minutes > 0) timeDuration += `${minutes} minutes `;
  var start = new Date(contest.start + `.000Z`).toLocaleString("en-US");
  const time = start.split(", ");
  var dateArray = time[0].split("/");

  var startTime = time[1];
  var date = `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`;
  var conEvent = "" + contest.event;
  if (conEvent.length > 50) conEvent = conEvent.substring(0, 50) + "....";

  return { timeDuration, date, startTime, conEvent };
};
// getContestList();
module.exports = { getContestList };
