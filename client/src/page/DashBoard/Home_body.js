import React from 'react';
import './CSS/Home-body/Home-body.css'; // Import your custom styles here

const Body = () => {
  return (
    <div className="home-container">
      <section className="section">
        <h2>Virtual Contest</h2>
        <p>
          Participate in virtual contests created by you or your friends using room IDs.
          Compete in peer programming and solve unsolved problems from Codeforces.
        </p>
      </section>

      <section className="section">
        <h2>Contest List</h2>
        <p>
          Explore upcoming coding contests from various coding contest platforms.
          Filter contests and access navigation links for easy participation.
        </p>
      </section>

      <section className="section">
        <h2>Profile</h2>
        <p>
          View your profile information from LeetCode and Codeforces.
          Get details about your coding handles and achievements.
        </p>
      </section>
    </div>
  );
};

export default Body;
