// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
// // import Wrapper from "../../assets/wrappers/LandingPage";
// import styled from "styled-components";
// import { BASE_URL } from "../../env";
// // import "./CSS/ContestArea/navBar.css"
// const ContestArea = () => {
//   const [Data, setData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const { RoomId } = useParams();
//   const navigate = useNavigate();
//   useEffect(() => {
//     navigate('problems');
//   }, []);
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get(BASE_URL +
//           "/api/v1/vcontest/getRoomProbs/" + RoomId
//         );
//         const data = response.data;

//         if (data) {
//           let problems = data.questions;
//           let probs = [];

//           for (let i = 0; i < problems.length; i++) {
//             let index = problems[i].index.split("-");
//             probs.push([
//               parseInt(index[0]),
//               index[1],
//               problems[i].name,
//               problems[i].rating,
//             ]);
//           }

//           setData({
//             problems: probs,
//             handles: data.handles,
//             start_time: data.Start_time,
//           });

//           let duration = data.Contest.duration;
//           let start_time = data.Start_time;

//           setLoading(false);
//           let d = new Date(start_time);
//           d.setSeconds(d.getSeconds() + duration * 60);
//           let t = (d.getTime() - new Date().getTime()) / 1000;

//           let min = duration * 60;
//           if (t <= min) {
//             if (t > 0) startTimer(t, document.querySelector(".timer"));
//           } else {
//             document.querySelector(".timer").innerHTML = "";
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     }

//     fetchData();
//   }, [RoomId]);

//   function startTimer(duration, display) {
//     let time = duration;
//     let minutes, seconds;

//     let c = setInterval(function () {
//       minutes = parseInt(time / 60, 10);
//       seconds = parseInt(time % 60, 10);

//       minutes = minutes < 10 ? "0" + minutes : minutes;
//       seconds = seconds < 10 ? "0" + seconds : seconds;

//       if (display) {
//         display.innerHTML = minutes + ":" + seconds;
//       }

//       if (--time < 0) {
//         clearInterval(c);
//         alert("Time's Up!!!");
//       }
//     }, 1000);
//   }
 

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>


//       <div>
//         <div className="nav-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px 0px 20px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
//           <div className="Left" style={{ display: 'flex', gap: '20px' }}>
//             <Link to="problems" style={{ color: 'var(--primary-700)', fontWeight: "bold" }}> <h5 >Problems</h5></Link>
//             <Link to="standings" style={{ color: 'var(--primary-700)', fontWeight: "bold" }}><h5>Standings </h5></Link>

//           </div>
//           <div className="right" style={{ display: 'flex', alignItems: 'center' }}>
//             <div className="timer" style={{ backgroundColor: 'var(--primary-600)', color: '#fff', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold' }}></div>
//           </div>
//         </div>

//         <Outlet context={Data} />
//       </div>
//     </div>
//   );
// };


// export default ContestArea;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL } from "../../env";

const ContestArea = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const { RoomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate('problems');
  }, []);

  useEffect(() => {
    let timerInterval;
    async function fetchData() {
      try {
        const response = await axios.get(BASE_URL +
          "/api/v1/vcontest/getRoomProbs/" + RoomId
        );
        const data = response.data;

        if (data) {
          let problems = data.questions.map(problem => {
            let index = problem.index.split("-");
            return [
              parseInt(index[0]),
              index[1],
              problem.name,
              problem.rating,
            ];
          });

          setData({
            problems: problems,
            handles: data.handles,
            start_time: data.Start_time,
          });

          let duration = data.Contest.duration;
          let start_time = data.Start_time;

          setLoading(false);
          let d = new Date(start_time);
          d.setSeconds(d.getSeconds() + duration * 60);
          let endTime = d.getTime();

          const timerInterval = setInterval(() => {
            let t = (endTime - new Date().getTime()) / 1000;

            if (t >= 0) {
              setTimeLeft(t);
            } else {
              clearInterval(timerInterval);
              alert("Time's Up!!!");
            }
          }, 1000);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();

    return () => clearInterval(timerInterval);
  }, [RoomId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div className="nav-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px 0px 20px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
          <div className="Left" style={{ display: 'flex', gap: '20px' }}>
            <Link to="problems" style={{ color: 'var(--primary-700)', fontWeight: "bold" }}> <h5 >Problems</h5></Link>
            <Link to="standings" style={{ color: 'var(--primary-700)', fontWeight: "bold" }}><h5>Standings </h5></Link>
          </div>
          <div className="right" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="timer" style={{ backgroundColor: 'var(--primary-600)', color: '#fff', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold' }}>
              {timeLeft !== null ? formatTime(timeLeft) : ""}
            </div>
          </div>
        </div>
        <Outlet context={data} />
      </div>
    </div>
  );
};

// Function to format time in minutes and seconds
function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

export default ContestArea;
