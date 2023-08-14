import React, { useState } from "react";
import "../DashBoard/CSS/Contest_list/constestList.css";
import {
  codeforces_png,
  atcoder_png,
  codechef_png,
  geeksforgeeks_png,
  google_png,
  hackerearth_png,
  leetcode_png,
  topcoder_png,
} from "./contest_images";

const CodingContestFilter = () => {
  const [hostSites, setHostSites] = useState([]);
  const [today, setToday] = useState("yes");
  const [duration, setDuration] = useState("all");

  const hostSitesData = [
    {
      name: "Codeforces",
      logo: codeforces_png,
    },
    {
      name: "CodeChef",
      logo: codechef_png,
    },
    {
      name: "AtCoder",
      logo: atcoder_png,
    },
    {
      name: "LeetCode",
      logo: leetcode_png,
    },
    {
      name: "HackerEarth",
      logo: hackerearth_png,
    },
    {
      name: "GeeksforGeeks",
      logo: geeksforgeeks_png,
    },
    {
      name: "Google",
      logo: google_png,
    },
    {
      name: "TopCoder",
      logo: topcoder_png,
    },
    // Add more host sites here
  ];

  const handleHostSiteToggle = (site) => {
    if (hostSites.includes(site)) {
      setHostSites(hostSites.filter((s) => s !== site));
    } else {
      setHostSites([...hostSites, site]);
    }
  };

  return (
    <div className="coding-contest-filter">
      <div className="host-sites">
        <h3>Host Sites</h3>
        <ul>
          {hostSitesData.map((site) => (
            <li
              key={site.name}
              className={hostSites.includes(site.name) ? "selected" : ""}
              onClick={() => handleHostSiteToggle(site.name)}>
              <img src={site.logo} alt={site.name} />
            </li>
          ))}
        </ul>
      </div>

      <div className="today">
        <h3>Today</h3>
        <div className="toggle">
          <button
            className={today === "yes" ? "selected" : ""}
            onClick={() => setToday("yes")}>
            Yes
          </button>
          <button
            className={today === "no" ? "selected" : ""}
            onClick={() => setToday("no")}>
            No
          </button>
        </div>
      </div>

      <div className="duration">
        <h3>Duration</h3>
        <ul>
          <li
            className={duration === "2h" ? "selected" : ""}
            onClick={() => setDuration("2h")}>
            2 hours
          </li>
          <li
            className={duration === "3h" ? "selected" : ""}
            onClick={() => setDuration("3h")}>
            3 hours
          </li>
          <li
            className={duration === "all" ? "selected" : ""}
            onClick={() => setDuration("all")}>
            All day
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CodingContestFilter;
