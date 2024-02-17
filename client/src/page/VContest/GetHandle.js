import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/CircularLoader";
import "./CSS/GetHandles/getHandles.css"

const CodeforcesURL = "https://codeforces.com/api/user.info?handles=";
const GetHandle = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [loader, setLoader] = useState("Get Started!");

  const [username, setUserName] = useState(
    localStorage.getItem("handle") || ""
  );
  function getData(e) {
    e.preventDefault();
    setIsLoading("Loading...");
    axios
      .get(`${CodeforcesURL}${username}`)
      .then(function (response) {
        // Handle success
        setIsLoading("Get Started!");

        if (response.status === 400) {
          toast.error("Invalid Handle");
        } else {
          localStorage.setItem("handle", username);
          navigate(`/vcontest/dashboard/${username}`);
        }
      })
      .catch(function (error) {
        // Handle error
        console.log(error);
      });
  }
  useEffect(() => {
    if (username != "") {
      navigate(`/vcontest/dashboard/${username}`);
    }
    setIsLoading(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [isLoading]);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
          <div className="fullscreen">
            <div className="content">
              <h1>Practice interactively </h1>
              <h1 className="heading">CodeBuddy</h1>
              <p>Add Your CodeForces Handle...</p>
              <form>
                <input
                  type="text"
                  name="handle"
                  placeholder="Codeforces Handle"
                  required
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <button type="submit" onClick={getData}>
                  {loader}
                  <i className="material-icons">arrow_forward</i>
                  {/* Add the button text here */}
                </button>
              </form>
            </div>
          </div>
      )}
    </div>
  );
};

export default GetHandle;
