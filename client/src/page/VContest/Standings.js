import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useOutlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
// import "./CSS/contest.css";
// import "./CSS/hero.css";
import './CSS/ContestArea/standing.css'
import winner from "./Resources/winner.gif"
const Standings = () => {
  const Data = useOutletContext();
  // console.log("data=>", Data);
  const navigate = useNavigate();
  const [loader, setloader] = useState("Fetching Users...");
  const { RoomId, handle } = useParams();
  const [nums, setnums] = useState([]);
  const problems = Data.problems;
  const userHandles = Data.handles;
  const start_time = Data.start_time;
  const [standings, setStandings] = useState([]);
  const [winner_handle, setWinnerHandle] = useState("");

  

  useEffect(() => {
     let tmpeArr=[];
    for(let j=0;j<problems.length;j++)tmpeArr.push(String.fromCharCode(65+j));
    setnums(tmpeArr);


    console.log("problems",problems);
    async function getPoints() {
      let re_map = new Map();
      setloader("Fetching All users submissions and Getting their Scores");
      for (let j = 0; j < userHandles.length; j++) {
        let handle_name = userHandles[j];
        let StatusUrl = `https://codeforces.com/api/user.status?handle=${handle_name}`;
        let arr = [];
        for (let i = 0; i < problems.length; i++) {
          arr.push({
            result: false,
            penalty: 0,
            time: "Not solved",
            qno: i,
            points: problems[i][3],
          });
        }
        try {
          let response = await axios.get(StatusUrl);
          if (!response) {
            alert(`some err Status fectching ${handle_name}`);
          }
          let results = response.data.result;

          // filter sumbitted result to problems in vcontest
          const filteredResults = results.filter((result) => {
            const contestId = result.problem.contestId;
            const index=result.problem.index;
            return problems.some((problem) => (problem[0] === contestId)&&(problem[1]===index));
          });
          console.log("filterRe",filteredResults);

          for (let i = 0; i < filteredResults.length; i++) {
            for (let ll = 0; ll < problems.length; ll++) {
              if (
                problems[ll][0] === filteredResults[i].contestId &&
                problems[ll][1] === filteredResults[i].problem.index
              ) {
                let unix_timeStamp = filteredResults[i].creationTimeSeconds;
                var date = new Date(unix_timeStamp * 1000);
                // hour part
                var date1 = date.getDate();
                var month1 = date.getMonth();
                var hours = date.getHours();
                //minutes
                let actualDate = new Date();
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                var formattedTime =
                  hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
                var act_date = new Date();
                let act_month = act_date.getMonth();
                let act_dat = act_date.getDate();

                let res = {
                  result: false,
                  penalty: 0,
                  time: "Not solved",
                  qno: ll,
                  points: filteredResults[i].problem.rating,
                };
                for (let l = 0; l < arr.length; l++) {
                  if (arr[l].qno == ll) {
                    res = arr[l];
                    break;
                  }
                }

                if (
                  filteredResults[i].verdict === "OK" &&
                  res.result == false
                ) {
                  res.time = formattedTime;
                  res.result = true;
                  res.points = filteredResults[i].problem.rating;

                  res.points = Math.floor(
                    Math.max(
                      res.points -
                        res.penalty * 50 -
                        Math.abs((date - start_time) / 60000) *
                          0.004 *
                          res.points,
                      res.points * 0.3
                    )
                  );
                  for (let l = 0; l < arr.length; l++) {
                    if (arr[l].qno == ll && arr[l].result == false) {
                      arr[l] = res;

                      break;
                    }
                  }
                } else {
                  if (act_dat == date1 && act_month == month1) {
                    res.penalty++;
                  }
                }
              }
            }
          }

          arr.sort((a, b) => {
            if (a.qno < b.qno) {
              return -1;
            }
            if (a.qno > b.qno) return 1;
            return 0;
          });
          re_map.set(userHandles[j], arr);
        
          // console.log(filteredResults,problems);
        } catch (error) {}
      }

      return re_map;
    }
    getStands();

    function getStands() {
      getPoints().then((map) => {
        setloader("");
        let objArray = [];
        let rn = 1;
        for (const entry of map.entries()) {
          let sol = 0;
          let totPoints = 0;
          let indiPoints = [];
          for (let i = 0; i < entry[1].length; i++) {
            if (entry[1][i].result === true) {
              totPoints += entry[1][i].points;
              sol++;
              indiPoints.push(entry[1][i].points);
            } else {
              indiPoints.push(0);
            }
          }
          let obj = {
            rank: rn,
            name: entry[0],
            solved: sol,
            totalPoints: totPoints,
            indiPoints: indiPoints,
          };
          objArray.push(obj);
          rn++;
        }
        objArray.sort((c1, c2) =>
          c1.totalPoints < c2.totalPoints
            ? 1
            : c1.totalPoints > c2.totalPoints
            ? -1
            : 0
        );
        setWinnerHandle(objArray[0].name);
        setStandings(objArray);
      });




    }
  }, []);
  return (
    <div className="contest">
      <div className="timer"></div>
      <div className="standings">
        <table className="table-container" style={{ margin: '10px' }}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Contestant</th>
              <th>Solved</th>
              <th>points</th>
              {nums.map((item) => {
                return <th>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody className="table-body">
            {standings.map((item,ind) => {
              return (
                <tr>
                  <td>{ind+1}</td>
                  <td>{item.name}</td>
                  <td>{item.solved}</td>
                  <td>{item.totalPoints}</td>
                  {item.indiPoints.map((item2) => {
                    return <td>{item2}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <Winner ></Winner> */}
      </div>



      <div className="loadingState">{loader}</div>
      <div className="winner">
        <img src={winner} alt="winner gif" />
        <h4>Current Winner:</h4>
        <h4 className="contest-winner">{winner_handle}</h4>
      </div>
    </div>
  );
};

export default Standings;
