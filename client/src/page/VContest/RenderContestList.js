import React from "react";

import { redirect, useNavigate, useParams } from "react-router-dom";
import "./CSS/DashBoard/RendercontestList.css";
const RenderContestList = ({ List, handle }) => {
  const naviagte = useNavigate();
  return (
    <div className="renderList">
      <div className="collection with-header">
        <div className="collection-header">
          <h5>Virtual Contest List For You:</h5>
        </div>
        {List.map((contest) => (
          <div className="contest-item card" key={contest.RoomId}>
            <div className="card-content">
              <div className="row valign-wrapper">
                <div className="col col-label">CreatedBy:</div>
                <div className="col col-data">{contest.CreatedBy}</div>
              </div>
              <div className="row valign-wrapper">
                <div className="col col-label">Time / Date:</div>
                <div className="col col-data">
                  {formatTimestamp(contest.Start_time).time} /{" "}
                  {formatTimestamp(contest.Start_time).date}
                </div>
              </div>
              <div className="row valign-wrapper">
                <div className="col col-label">RoomId:</div>
                <div className="col col-data">{contest.RoomId}</div>
              </div>
              <div className="row">
                <button
                  className="go-to-room-btn"
                  onClick={() =>
                    naviagte(`/ContestArea/${contest.RoomId}/${handle}`)
                  }>
                  Go to Room
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
  
    // Format time (HH:MM AA)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const time = `${formattedHours}:${formattedMinutes} ${ampm}`;
  
    // Format date (DD/MM/YY)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    const formattedDay = day.toString().padStart(2, "0");
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedYear = year.toString().padStart(2, "0");
    const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear}`;
  
    // return <div> <span> {`${time}   ${formattedDate} `} </span></div>
    return { time, date: formattedDate };
  }

export default RenderContestList;
