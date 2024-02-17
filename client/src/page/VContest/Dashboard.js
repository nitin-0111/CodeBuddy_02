import axios from "axios";
import React, { useEffect, useState } from "react";

import "./CSS/DashBoard/DashBoard.css";

import { redirect, useNavigate, useParams } from "react-router-dom";
import RenderContestList from "./RenderContestList";
import { BASE_URL } from "../../env";

// import M from "materialize-css";
const Dashboard = () => {
  const naviagte = useNavigate();
  const { handle } = useParams();
  const [ContestList, setList] = useState(null);

  useEffect(() => {
    async function getContestList() {
      try {
        let data = await axios.get(BASE_URL + "/api/v1/vcontest/getContestList/" + handle);
        data = data.data;
        console.log("data=>", data);
        setList(data);
      } catch (error) { }
    }
    getContestList();
  }, []);
  const [RoomId, setRoomId] = useState();
  // console.log(handle);
  return (
    <div className="dashboard">
      <form
        className="formToJoinViaInp"
        onSubmit={(e) => {
          e.preventDefault();
          naviagte(`/ContestArea/${RoomId}/${handle}`);
        }}>
        <div className="input-field roomID">
          <input
            id="RoomId"
            type="text"
            className="validate"
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
          />
          <label htmlFor="RoomId">Room ID</label>
          <div
            className="bnt-space"
            style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="submit">Go to Room</button>

            <button
              onClick={() => naviagte(`/vcontest/createContest/${handle}`)}>
              + Create Contest
            </button>
          </div>
        </div>
      </form>
      <div className="" style={{display:"flex", justifyContent:"space-around"}}>
        {ContestList && <RenderContestList List={ContestList} handle={handle} />}
      </div>
    </div>
  );
};

export default Dashboard;
