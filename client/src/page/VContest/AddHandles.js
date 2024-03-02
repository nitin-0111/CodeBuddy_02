import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import M from "materialize-css";
import "./CSS/Add_handles/add_handles.css"
// Uncomment the import below if you haven't already imported Materialize CSS in your main project file.
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../env";

const AddHandles = () => {
  const navigate = useNavigate();
  const handle = localStorage.getItem("handle") || "";

  const { RoomId } = useParams();
  const [loader, setLoader] = useState("Add Handles");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [handles, setHandles] = useState(new Set());

  const addHandle = (newHandle) => {
    setHandles((prevHandles) => new Set([...prevHandles, newHandle]));
  };

  const handleList = Array.from(handles).map((handle) => (
    <li key={handle}>
     
      {handle}
    </li>
  ));

  useEffect(() => {
    if (!handle) {
      navigate("/vcontest/getHandle");
    }
    addHandle(handle);
    async function getRoomProbs() {
      setIsLoading(true);
      try {
        const response = await axios.get(BASE_URL+
          `/api/v1/vcontest/getRoomProbs/${RoomId}`
        );
        setData(response.data);
        // console.log(response.data,data);
      } catch (err) {}
      setIsLoading(false);
    }
    getRoomProbs();

    const elems = document.querySelectorAll(".chips");
    const options = {
      placeholder: "Enter Handle",
      secondaryPlaceholder: "More Handles?",
    };
    M.Chips.init(elems, options);
    M.AutoInit();
  }, []);

  const handlePublish = async () => {
    try {
      setIsLoading(true);
      setLoader("loading...");
      const userHandles = [...handles];
      // console.log(userHandles);
      const response = await axios.post(BASE_URL+"/api/v1/vcontest/publishContest", {
        userHandles,
        RoomId,
      });
      navigate(`/ContestArea/${RoomId}/${handle}`);
      // console.log(response.data);
    } catch (err) {}
  };

  const checkhandles = () => {
    setLoader("Validating Handles...");
    const instance = M.Chips.getInstance(elem).chipsData;
    // console.log(instance, instance.chipsData);
    if (instance.length > 10) {
      toast.error("Limit is Upto 10 Handles!");
      return;
    }
    checkhandle(instance);
  };

  const checkhandle = async (instance) => {
    let fl = 1;
    for (let i = 0; i < instance.length; i++) {
      // console.log(instance[i].tag);
      const CodeforceURL = "https://codeforces.com/api/user.info?handles=";

      try {
        const response = await axios.get(`${CodeforceURL}${instance[i].tag}`);

        // console.log("codeforce", response.data);

        if (response.status !== 200 || response.data.status !== "OK") {
          fl = 0;
          alert(`Invalid Handle ${instance[i].tag}`);
          break;
        } else {
          addHandle(instance[i].tag);
        }
      } catch (error) {
        fl = 0;
        // toast.error(`Invalid Handle ${instance[i].tag}`);
        alert(`Invalid`);
        break;
      }
    }
    setLoader("Add Handles");
  };

  const elem = document.querySelector(".chips");

  return (
    <>
      {/* info about contest like num, dur,date and time, diff range  */}
      <div className="addHandles">
        <div className="manualHandles">
          <h4>Add User Handles</h4>
          <a
            className="tooltipped"
            data-position="right"
            data-tooltip="Enter the Codeforces handles of users you want to create a room with. Don't forget to hit enter after each handle!"
          >
            <i className="material-icons">info_outline</i>
          </a>
        </div>

        <div className="chips chips-placeholder" />
        <div className="getQuestions">
          <button
            className="waves-effect waves-light btn questionsButton"
            onClick={checkhandles}
          >
            {loader}
          </button>
      <button onClick={handlePublish}>Publish</button>
        </div>

        <div>
          <h4>Added Handles</h4>
          <ul>{handleList}</ul>
        </div>
      </div>

      {/* button to publish contest */}
    </>
  );
};
export default AddHandles;

