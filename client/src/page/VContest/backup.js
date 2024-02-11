import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const CreateContest = () => {
  const naviagte = useNavigate();
  const { handle } = useParams();
  const [min, setMin] = useState(1000);
  const [max, setMax] = useState(1900);
  const [duration, setDuration] = useState(90);
  const [numProblems, setNumProblems] = useState(5);
  const [Date, setDate] = useState(null);
  const [roomId, setroomId] = useState(null);

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/v1/vcontest/getRoomId");
      const Id = response.data.roomId;
      setroomId(Id);
      //  console.log(Id);

      const momentObj = moment(Date, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");
      const timestamp = momentObj.valueOf();
      const postData = {
        RoomId: Id,
        Contest: {
          num: numProblems,
          min: min,
          max: max,
          duration: duration,
        },

        Start_time: timestamp,
      };
      // const headers = {
      //   "Content-Type": "application/json",
      // };
      console.log(postData);
      const data = await axios.post("/api/v1/vcontest/createRoom", postData);
      console.log(data);
      naviagte(`/vcontest/AddHandle/${Id}`);
    } catch (err) {
      console.log("this error");
    }
  };
  return (
    <div className="container">
      <form onSubmit={submitHandle}>
        <div className="num">
          <label for="numProblems">Number of Problems :</label>
          <p class="range-field">
            <input
              type="number"
              name="numProblems"
              defaultValue="5"
              min="3"
              max="10"
              onChange={(e) => {
                setNumProblems(e.target.value);
              }}
            />
          </p>
        </div>
        <div className="range">
          {/* difficulty range */}
          <div className="minMaxRange">
            <label for="min">Difficulty: </label>
            <input
              type="number"
              name="min"
              style={{ width: "80px", marginRight: "20px" }}
              min={800}
              max={3500}
              defaultValue={1000}
              step={100}
              onChange={(e) => {
                let val = Math.max(e.target.value, 800);
                val = Math.min(e.target.value, 3500);
                setMin(val);
              }}
            />{" "}
            to
            <input
              type="number"
              name="max"
              style={{ width: "100px", marginLeft: "40px" }}
              min={800}
              max={3500}
              defaultValue={2000}
              step={100}
              onChange={(e) => {
                let val = Math.max(e.target.value, 800);
                val = Math.min(e.target.value, 3500);
                setMax(val);
              }}
            />
          </div>

          {/* Duration range  */}
          <div className="minMaxRange">
            <label for="time">Duration(In Minutes): </label>
            <input
              type="number"
              name="time"
              style={{ width: "60px" }}
              min={10}
              defaultValue={90}
              step={5}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            />{" "}
          </div>
        </div>
        <label for="DatePicker"> Contest Date and Time :</label>
        <DatePicker
          selected={Date}
          onChange={(date) => {
            setDate(date);
            // console.log(date);
          }}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat=" h:mm aa ||  MMMM d, yyyy"
          placeholderText="Select date and time"
        />

        <div className="submitButton">
          <button type="submit">Create It</button>
        </div>
      </form>

      <div>
        <ClipboardCopy copyText={"hello"} />
      </div>
    </div>
  );
};

const ClipboardCopy = ({ copyText }) => {
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      const textField = document.createElement("textarea");
      textField.innerText = text;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
      return Promise.resolve();
    }
  }

  // onClick handler function for the chip
  const handleChipClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <span> Room Id:</span>
      <input type="text" value={copyText} readOnly />
      </div>
      <button
        className={`chip ${isCopied ? "green" : ""}`}
        onClick={handleChipClick}>
        <span>{isCopied ? "Copied!" : "Copy"}</span>
      </button>
    </div>
  );
};



const DateTimePicker = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(() => {
    const initialTime = new Date();
    initialTime.setMinutes(initialTime.getMinutes() + 5);
    return initialTime;
  });

  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
  };

  return (
    <DatePicker
      selected={selectedDateTime}
      onChange={handleDateTimeChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={5}
      dateFormat="MMMM d, yyyy h:mm aa"
      placeholderText="Select date and time"
    />
  );
};




export default CreateContest;
