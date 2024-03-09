const axios = require("axios");

// const username = "nitin-007";
const graphqlUrl = "https://leetcode.com/graphql";

const getLeecodeData = async (username) => {

  // const query = `{userContestRankingInfo(username: "${username}") {
  //       attendedContestsCount
  //       rating
  //       globalRanking
  //       totalParticipants
  //       topPercentage
  //     }
  //     userContestRankingHistory(username: "${username}") {
  //       attended
  //       trendDirection
  //       problemsSolved
  //       totalProblems
  //       finishTimeInSeconds
  //       rating
  //       ranking
  //       contest {
  //         title
  //         startTime
  //       }
  //     }
  //   }`;
  const query = `
    query userContestRankingInfo($username: String!) {
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
          name
        }
      }
      userContestRankingHistory(username: $username) {
        attended
        trendDirection
        problemsSolved
        totalProblems
        finishTimeInSeconds
        rating
        ranking
        contest {
          title
          startTime
        }
      }
    }
  `;
  try {
    const res = await axios.post(graphqlUrl, {
      query,
      variables: { username },
    });
    res = res.data.data;

    let contestInfo = res.userContestRankingHistory;
    contestInfo = contestInfo.filter((entry) => {
      if (entry.attended) {
        entry.contest.startTime = new Date(entry.contest.startTime * 1000);
        return entry;
      } else return false;
    });

    let data = {};
    data.userName = username;
    data.userProfile = res.userContestRanking;

    let prev = 1500;
   let newArray = contestInfo.map((item) => {
      const newitem = {
        name: item.contest.title,
        time: formatDateString(item.contest.startTime),
        rank: item.ranking,
        change: Math.trunc(item.rating - prev),
        cur_rating: item.rating,
      };
      prev = item.rating;
      return newitem;
    }).reverse();
    
    // newArray.;
    
    data.Contest = newArray;
    // data.Contest.sort((a, b) => new Date(b.time) - new Date(a.time));


    console.log(data);
    return data;
  } catch (err) {
    console.log("err");

    return { msg: err };
  }
};
getLeecodeData('nsp-0111');

const getCodeforcesData = async (username) => {
  const Base_url = `https://codeforces.com/api/`;
  let data = {};
  try {
    data.userName = username;
    let res = await axios.get(Base_url + `user.info?handles=${username}`);

    data.userProfile = res.data.result.map((item) => ({
      rating: item.rating,
      maxRating: item.maxRating,
      rank: item.rank,
      maxRank: item.maxRank,
      friends: item.friendOfCount,
    }))[0];

    res = await axios.get(Base_url + `user.rating?handle=${username}`);

    data.Contest = res.data.result.map((item) => ({
      name: item.contestName,
      time: formatTimestamp(item.ratingUpdateTimeSeconds),
      rank: item.rank,
      change: item.newRating - item.oldRating,
      cur_rating: item.newRating,
    })).reverse();
    
   
    data.userProfile.attended = data.Contest.length;
    // data.Contest.;

    // console.log(data);
    
  } catch (err) {
    return { msg: err };
  }

  return data;
};




function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1; // Adding 1 to get 1-based month
  const year = date.getFullYear().toString().slice(-2); // Extracting last two digits of the year

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const period = hours < 12 ? "AM" : "PM";

  // Format minutes with leading zero if necessary
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Create the final formatted string
  const formattedDate = `${formattedHours}:${formattedMinutes} ${period} ${day}/${month}/${year}`;

  return formattedDate;
}



function formatDateString(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1; // Adding 1 to get 1-based month
  const year = date.getFullYear().toString().slice(-2); // Extracting last two digits of the year

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const period = hours < 12 ? "AM" : "PM";

  // Format minutes with leading zero if necessary
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Create the final formatted string
  const formattedDate = `${formattedHours}:${formattedMinutes} ${period} ${day}/${month}/${year}`;

  return formattedDate;
}

module.exports = { getLeecodeData, getCodeforcesData };
