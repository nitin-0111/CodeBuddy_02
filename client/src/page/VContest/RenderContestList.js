import React from "react";

import { redirect, useNavigate, useParams } from "react-router-dom";
import "./CSS/DashBoard/RendercontestList.css";
const RenderContestList = ({ List, handle }) => {
  const navigate = useNavigate();
  return (
    <div className="renderList" style={{ width: '100%', margin: '0 auto' }}>
      <div className="collection-header">
        <h3>Virtual Contest List For You:</h3>
      </div>
      <div className="collection-List" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {List.map((contest) => (
          <div className="contest-item card" key={contest.RoomId} style={{ marginBottom: '20px', width: '100%' }}>
            <div className="card-content">
              <div className="info-row">
                <div className="info-label">RoomId:</div>
                <div className="info-value">{contest?.RoomId}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Date & Time:</div>
                <div className="info-value">
                  {formatTimestamp(contest.Start_time).date} {formatTimestamp(contest.Start_time).time}
                </div>
              </div>
              <div className="info-row">
                <div className="info-label">CreatedBy:</div>
                <div className="info-value">{contest.CreatedBy}</div>
              </div>
            </div>
            <div className="row">
              <button
                className="room-btn"
                onClick={() =>
                  navigate(`/ContestArea/${contest.RoomId}/${handle}`)
                }>
                Go Contest Room ►
              </button>
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
