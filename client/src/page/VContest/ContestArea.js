import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
// import Wrapper from "../../assets/wrappers/LandingPage";
import styled from "styled-components";
import { BASE_URL } from "../../env";
// import "./CSS/ContestArea/navBar.css"
const ContestArea = () => {
  const [Data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { RoomId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(BASE_URL +
          "/api/v1/vcontest/getRoomProbs/" + RoomId
        );
        const data = response.data;

        if (data) {
          let problems = data.questions;
          let probs = [];

          for (let i = 0; i < problems.length; i++) {
            let index = problems[i].index.split("-");
            probs.push([
              parseInt(index[0]),
              index[1],
              problems[i].name,
              problems[i].rating,
            ]);
          }

          setData({
            problems: probs,
            handles: data.handles,
            start_time: data.Start_time,
          });

          let duration = data.Contest.duration;
          let start_time = data.Start_time;

          setLoading(false);
          let d = new Date(start_time);
          d.setSeconds(d.getSeconds() + duration * 60);
          let t = (d.getTime() - new Date().getTime()) / 1000;

          let min = duration * 60;
          if (t <= min) {
            if (t > 0) startTimer(t, document.querySelector(".timer"));
          } else {
            document.querySelector(".timer").innerHTML = "";
          }
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
  }, []);

  function startTimer(duration, display) {
    let timer = duration;
    let minutes, seconds;

    let c = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      if (display) {
        display.innerHTML = minutes + ":" + seconds;
      }

      if (--timer < 0) {
        clearInterval(c);
        alert("Time's Up!!!");
      }
    }, 1000);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>


      <div>
        <div className="nav-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px 0px 20px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
          <div className="Left" style={{ display: 'flex', gap: '20px'}}>
            <Link to="problems" style={{color:'var(--primary-700)', fontWeight:"bold"}}> <h5 >Problems</h5></Link>
            <Link to="standings" style={{color:'var(--primary-700)', fontWeight:"bold"}}><h5>Standings </h5></Link>
           
          </div>
          <div className="right" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="timer" style={{ backgroundColor: 'var(--primary-600)', color: '#fff', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold' }}></div>
          </div>
        </div>

        <Outlet context={Data} />
      </div>
    </div>
  );
};








// const Wrapper = styled.nav`
//   background-color: #f0f0f0;
//   border: 1px solid #ddd;
//   padding: 1rem;
//   font-weight: bold;
//   body{
//     flex-direction:row;
//   }

//   ul {
//     list-style: none;
//     padding: 0;
//     margin: 0;
//     display: flex;

//     li {
//       margin-right: 1rem;

//       a {
//         text-decoration: none;
//         color: #333;

//         &:hover {
//           color: #007bff;
//         }
//       }
//     }
//   }
// `;




export default ContestArea;
