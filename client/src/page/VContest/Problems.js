import React from "react";
// import "./Questions.css";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/ContestArea/problem.css"
import { ToastContainer } from "react-toastify";
const Problems = () => {
  const Data = useOutletContext();
  const navigate = useNavigate();
  const { RoomId, handle } = useParams();
  const [time, setTime] = useState([0, 0]);
  // handle = localStorage.getItem("handle");
  const [problems, setProbs] = useState(Data.problems);
  // useEffect(() => {}, []);

  function getLink(ind) {
    let p = problems[ind][0],
      q = problems[ind][1];
    let link = `https://codeforces.com/problemset/problem/${p}/${q}`;
    return link;
  }
  return (
    <div>
      <div className="timer"></div>
      {/* <div className="questions"> */}
      <div className="ques" style={{ margin: '35px' }}>
        {problems.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th> Index </th>
                  <th>Problem Title</th>
                  <th>Submit</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((item, ind) => {
                  return (
                    <tr key={ind}>
                      <td>{String.fromCharCode(65 + ind)}</td>
                      <td><h5>{item[2]}</h5></td>
                      <td>
                       
                        <a href={getLink(ind)} target="_blank" rel="noopener noreferrer">Solve</a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Contest is not properly created. Abort the contest.</p>
        )}
      </div>


      {/* </div> */}
    </div>
  );
};

export default Problems;
