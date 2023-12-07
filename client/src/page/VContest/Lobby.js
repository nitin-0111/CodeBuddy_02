
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, Redirect, useNavigate, useParams } from "react-router-dom";
import "./CSS/Lobby/lobby.css"; // Import the CSS file for styling

const Lobby = () => {
  const navigate = useNavigate();
  const { RoomId } = useParams();
  const [targetTimestamp, setTargetTimestamp] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timerExpired, setTimerExpired] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    async function getData() {
      try {
        let room = await axios.get("/api/v1/vcontest/getRoomProbs/" + RoomId);
        room = room.data;
        setTargetTimestamp(room.Start_time);
        setLoading(false); // Data fetched, set loading to false
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [RoomId]);

  useEffect(() => {
    if (targetTimestamp) {
      const interval = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [targetTimestamp]);

  useEffect(() => {
    if (targetTimestamp && timeRemaining) {
      if (
        timeRemaining.days === 0 &&
        timeRemaining.hours === 0 &&
        timeRemaining.minutes === 0 &&
        timeRemaining.seconds === 0
      ) {
        setTimerExpired(true);
      }
    }
  }, [timeRemaining]);

  function calculateTimeRemaining() {
    const currentTime = new Date().getTime();
    const timeDifference = targetTimestamp - currentTime;

    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  }

  if (loading) {
    // Show a loading message while fetching data
    return <div>Loading...</div>;
  }

  return (
    <div className="lobbyContainer">
      <div className="countdownTimer">
        <h2>Contest Starts In:</h2>
        <div className="timer">
          <div className="timerItem">
            <span>{timeRemaining.days}</span> <span>Days</span>
          </div>
          <div className="timerItem">
            <span>{timeRemaining.hours}</span> <span>Hours</span>
          </div>
          <div className="timerItem">
            <span>{timeRemaining.minutes}</span> <span>Minutes</span>
          </div>
          <div className="timerItem">
            <span>{timeRemaining.seconds}</span> <span>Seconds</span>
          </div>
        </div>
      </div>
      {timerExpired && (
        <button
          onClick={() => {
            navigate("ContestArea");
          }}
          className="goToContestBtn"
        >
          Go to Contest
        </button>
      )}
    </div>
  );
};

export default Lobby;

