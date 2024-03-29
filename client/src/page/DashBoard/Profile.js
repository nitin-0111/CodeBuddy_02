import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoSend } from "react-icons/io5";
import styled from "styled-components";
import { FormRow } from "../../components";
import { useSelector } from "react-redux";
import axios from "axios";
import { localeData } from "moment";

import "./CSS/Profile/ProfileRender.css";
import "../DashBoard/CSS/Table/Table.css"; // Table
import "../DashBoard/CSS/Profile/ProfileRender.css"; //

import "materialize-css";

import M from "materialize-css/dist/js/materialize.min.js";
import { BASE_URL } from "../../env";
import { codeforces_png, leetcode_png } from "../Contest/contest_images";

const Profile = () => {
  const [userHandle, setUserHandle] = useState({
    codeforcesId: "",
    leetcodeId: "",
  });
  // const []
  const [codeforceData, setCodeforceData] = useState(null);
  const [leetcodeData, setleetcodeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetch, setfetch] = useState(false);
  const { user } = useSelector((store) => store.user);
  // let codeforceData, leetcodeData;

  useEffect(() => {
    // console.log(codeforceData?.userName);
  }, [codeforceData]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setUserHandle({ ...userHandle, [name]: value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const { codeforcesId, leetcodeId } = userHandle;
    if (!codeforcesId && !leetcodeId) {
      setIsLoading(false);
      toast.error("Please fill the required fields.");
      return;
    }

    axios
      .get(BASE_URL + "/api/v1/userContest/profile", {
        params: {
          codeforceId: userHandle.codeforcesId,
          leetcodeId: userHandle.leetcodeId,
          userId: user.userId,
        },
      })
      .then((res) => {
        toast.success("success");

        // res.data.codeforce.sort((a.Contest, b.Contest) => new Date(a.Contest.time) - new Date(a.Contest.time));
        // console.log(res.data.codeforce);

        if (res.data && res.data.codeforce)
          setCodeforceData(res.data.codeforce);

        if (res.data && res.data.leetcode) setleetcodeData(res.data.leetcode);

        setfetch(true);
        setIsLoading(false);

        console.log("eetcodadfasdf---> ", leetcodeData);

      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("req failed");
      });
  };

  return (
    <div className="container">
      <div className="input-from">
        {!fetch && (
          <form className="form" onSubmit={handleSubmit}>
            <h4> Input userId </h4>
            {/* codeforces id */}
            <FormRow
              type="text"
              name="codeforcesId"
              value={userHandle.codeforcesId}
              handleChange={handleChange}
              labelText="Codeforces Id"
            />
            {/* leetcode Id */}
            <FormRow
              type="text"
              name="leetcodeId"
              value={userHandle.leetcodeId}
              handleChange={handleChange}
              labelText="Leetcode Id"
            />
            <button
              className="btn btn-block waves-effect waves-light"
              disabled={isLoading}
              style={{ backgroundColor: 'var(--primary-700)' }}>
              <span>Submit</span> <IoSend />
            </button>
          </form>
        )}
      </div>
      <div className="user-profile" style={{display:'flex',justifyContent:'space-around'}}>
        <div className="leetcode">
          {(leetcodeData && leetcodeData.userName) && (
            <div>
              <h3>LeetCode</h3>
              <ProfileRender data={leetcodeData} />
            </div>
          )}
        </div>
        <div className="codeforce">
          {(codeforceData && codeforceData.userName) && (
            <div>
              <h3>Codeforces</h3>
              <ProfileRender data={codeforceData} />
            </div>
          )}
        </div>
      </div>

      <div className="contest-history">
        <div className="codeforces">
          {codeforceData && (
            <div>
              <h4> Codeforces Contest History: </h4>
              <Table data={codeforceData.Contest} />
            </div>
          )}
        </div>
        <div className="leetcode">
          {leetcodeData && (
            <div>
              <h4> Leetcode Contest History: </h4>
              <Table data={leetcodeData.Contest} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileRender = ({ data }) => {
  const { userName, userProfile } = data;

  let isCodeforces = false,isLeetcode=false;
  if (userProfile && userProfile.rank) {
    isCodeforces = true;
  }
 if(userProfile && userProfile.globalRanking)
  isLeetcode=true;
  return (

    <div className="profile-container" >
      {isCodeforces && (
        <div className="codeforces" >
          <div className="avatar-logo">
            <img src={codeforces_png} alt={"codeforces"} />
          </div>
          <h2>{userName}</h2>
          <p>Rating: {userProfile?.rating}</p>
          <p>Rank: {userProfile.rank}</p>
          <p>Max Rating: {userProfile.maxRating}</p>
          <p>Max Rank: {userProfile.maxRank}</p>
          <p>Friends: {userProfile.friends}</p>
          <p>Contests Attended: {userProfile.attended}</p>
        </div>
      )}
      {isLeetcode && (
        <div className="leetcode">
          <div className="avatar-logo">
            <img src={leetcode_png} alt={"leetcode"} />
          </div>
          <h2>{userName}</h2>
          <p>Rating: {userProfile?.rating}</p>
          <p>Global Ranking: {userProfile.globalRanking}</p>
          <p>Rating: {userProfile?.rating}</p>
          <p>Top Percentage: {userProfile.topPercentage}</p>
          <p>Total Participants: {userProfile.totalParticipants}</p>
          <p>Contests Attended: {userProfile.attendedContestsCount}</p>
        </div>
      )}
    </div>

  );
};

const Table = ({ data }) => {
  const isPositiveChange = (change) => change > 0;

  return (
    <div className="table-container">
      {data && (
        <table>
          <thead>
            <tr>
              <th>Contest</th>
              <th>Time</th>
              <th>Rank</th>
              <th>Change</th>
              <th>Current Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.map((contest) => {
              const changeColor = isPositiveChange(contest.change)
                ? "green"
                : "red";
              const textColor = isPositiveChange(contest.change)
                ? "green-text"
                : "red-text";
              const changeIcon = isPositiveChange(contest.change)
                ? "arrow_drop_up"
                : "arrow_drop_down";

              return (
                <tr key={contest.name}>
                  <td>{contest.name}</td>
                  <td>{contest.time}</td>
                  <td>{contest.rank}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i className={`material-icons change-icon ${textColor}`}>
                        {changeIcon}
                      </i>
                      <span className={textColor}>
                        {Math.abs(contest.change)}
                      </span>
                    </div>
                  </td>
                  <td>{contest.cur_rating}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Profile;
