import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../env";
const ProtectedContestRoute = ({ children }) => {
  console.log('inside protected');
  const { RoomId, handle } = useParams();
  const [invited, setInvited] = useState(null);

  useEffect(() => {
    if (!handle) {
      return <Navigate to="/vcontest/getHandle" />;
    }
    if (!RoomId) {
      return <Navigate to={`/vcontest/dashboard/${handle}`} />;
    }
    async function getRoomProbs() {
      try {
        let data = await axios.get(BASE_URL+"/api/v1/vcontest/getRoomProbs/" + RoomId);
        data = data.data;
        console.log(data.handles);
        if (!data) {
          return <Navigate to={`/vcontest/dashboard/${handle}`} />;
        }
        if (!data.handles.includes(handle)) {
          // toast your are not a part of party or not invited
          console.log("includes");
          setInvited(false);
        } else {
          setInvited(true);
        }
      } catch (err) {
        console.log("err");
        return <Navigate to={`/vcontest/dashboard/${handle}`} />;
      }
    }
    getRoomProbs();
  }, [RoomId, handle]);

  if (invited === null) {
    return (
      <div>
        {" "}
        <h1> verifing ...</h1>
      </div>
    );
  }
  if (invited === false) {
    return (
      <div>
        <h1> Your are not invited... </h1>
      </div>
    );
  }
  if (invited) {
    return children;
  }
};

export default ProtectedContestRoute;
