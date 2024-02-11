import React from "react";
// import "./Questions.css";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/ContestArea/problem.css"
const Problems = () => {
  const Data=useOutletContext();
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
      <div className="questions">
        <div className="cards">
          {problems.length > 0 ? (
            problems.map((item, ind) => (
              <div key={item[2]}>
                <div className="card card1">
                  <div className="container"></div>
                  <div className="details">
                    <h3>{item[2]}</h3>
                    <a
                      href={getLink(ind)}
                      target="_blank"
                      className="button-do-it">
                      Do It
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Contest is Not created properly abort the contest</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Problems;
