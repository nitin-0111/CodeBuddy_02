import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../DashBoard/CSS/Contest_list/contestLLinst.css";
import Loading from "../../components/CircularLoader";

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

const hostSitesData = [
  {
    name: "Codeforces",
    logo: codeforces_png,
    url: "https://codeforces.com",
    value: "codeforces.com",
  },
  {
    name: "CodeChef",
    logo: codechef_png,
    url: "https://www.codechef.com",
    value: "codechef.com",
  },
  {
    name: "AtCoder",
    logo: atcoder_png,
    url: "https://atcoder.jp",
    value: "atcoder.jp",
  },
  {
    name: "LeetCode",
    logo: leetcode_png,
    url: "https://leetcode.com",
    value: "leetcode.com",
  },
  {
    name: "HackerEarth",
    logo: hackerearth_png,
    url: "https://www.hackerearth.com",
    value: "hackerearth.com",
  },
  {
    name: "GeeksforGeeks",
    logo: geeksforgeeks_png,
    url: "https://www.geeksforgeeks.org",
    value: "geeksforgeeks.org",
  },
  {
    name: "Google",
    logo: google_png,
    url: "https://codingcompetitions.withgoogle.com",
    value: "codingcompetitions.withgoogle.com",
  },
  {
    name: "TopCoder",
    logo: topcoder_png,
    url: "https://www.topcoder.com",
    value: "topcoder.com",
  },
  // Add more host sites here
];
const imageMap = {
    "codeforces.com": codeforces_png,
    "codechef.com": codechef_png,
    "atcoder.jp": atcoder_png,
    "leetcode.com": leetcode_png,
    "hackerearth.com": hackerearth_png,
    "geeksforgeeks.org": geeksforgeeks_png,
    "codingcompetitions.withgoogle.com": google_png,
    "topcoder.com": topcoder_png,
    // Add more host sites here
  };

const Contest = () => {
  const [Data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    host: hostSitesData.map((site) => site.value),
    today: "no",
    duration: "all",
  });

  useEffect(() => {
    fetchData();
  }, [filterOptions]);

  const fetchData = () => {
    setLoading(true);
    const host = filterOptions.host;
    const today = filterOptions.today === "yes" ? 1 : 0;
    const duration =
      filterOptions.duration === "all"
        ? 0
        : filterOptions.duration === "2h"
        ? 2
        : 3;

    axios
      .post("/api/v1/userContest/contest-list", {
        host: host,
        today: today,
        duration: duration,
      })
      .then((res) => {
        setLoading(false);
        setData(res.data.data);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error fetching data");
      });
  };

  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  const handleFilterChange = (filterData) => {
    setFilterOptions(filterData);
  };

  return (
    <div className="contest">
      <h2>Contest List</h2>
      <CodingContestFilter Options={filterOptions} onChange={handleFilterChange} />

      {loading ? (
        <Loading />
      ) : (
        Data && (
          <div>
            {Data.map((item, ind) => (
              <div
                key={item.conEvent}
                className="contest-item"
                onClick={() => handleLinkClick(item.href)}
              >
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <img src={imageMap[item.website]} alt="png" className="logo" />
                  {item.conEvent}
                </a>
                <div className="details">
                  <p>
                    Started At: <strong>{item.startTime}</strong>
                  </p>
                  <p>Duration: {item.timeDuration}</p>
                  <p>
                    Time Left:{" "}
                    <span className="update" id={`update${item.id}`}></span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

const CodingContestFilter = ({ Options, onChange }) => {
  const { host, today, duration } = Options;

  const handleHostSiteToggle = (site) => {
    if (host.includes(site)) {
      onChange({ ...Options, host: host.filter((s) => s !== site) });
    } else {
      onChange({ ...Options, host: [...host, site] });
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
              className={host.includes(site.value) ? "selected" : ""}
              onClick={() => handleHostSiteToggle(site.value)}
            >
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
            onClick={() => onChange({ ...Options, today: "yes" })}
          >
            Yes
          </button>
          <button
            className={today === "no" ? "selected" : ""}
            onClick={() => onChange({ ...Options, today: "no" })}
          >
            No
          </button>
        </div>
      </div>

      <div className="duration">
        <h3>Duration</h3>
        <ul>
          <li
            className={duration === "2h" ? "selected" : ""}
            onClick={() => onChange({ ...Options, duration: "2h" })}
          >
            2 hours
          </li>
          <li
            className={duration === "3h" ? "selected" : ""}
            onClick={() => onChange({ ...Options, duration: "3h" })}
          >
            3 hours
          </li>
          <li
            className={duration === "all" ? "selected" : ""}
            onClick={() => onChange({ ...Options, duration: "all" })}
          >
            All day
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contest;
