import React, { useEffect, useState } from 'react';
import './CSS/Home-body/Home-body.css'; // Import your custom styles here

// import img1 from "../../assets/images/landing_page_svg/1.svg";
import img1 from "../../assets/images/landing_page_svg/1.svg";
import img2 from "../../assets/images/landing_page_svg/2.svg";
import img3 from "../../assets/images/landing_page_svg/3.svg";
import img4 from "../../assets/images/landing_page_svg/4.svg";
import img5 from "../../assets/images/landing_page_svg/5.svg";
import img6 from "../../assets/images/landing_page_svg/6.svg";
import img7 from "../../assets/images/landing_page_svg/7.svg";
import img8 from "../../assets/images/landing_page_svg/8.svg";
import img9 from "../../assets/images/landing_page_svg/9.svg";
import img10 from "../../assets/images/landing_page_svg/10.svg";
import img11 from "../../assets/images/landing_page_svg/11.svg";
const Body = () => {
  const images = [
    img1, img2, img3, img4, img5,
    img6, img7, img8, img9, img10, img11
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 4000); // Change the interval as per your requirement (in milliseconds)

    return () => clearInterval(interval);
  }, [images]);
  return (
    <div className="home-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '20px' }}>
      <div className="left" style={{ flex: 2 }}>
        <section className="section">
          <h2 style={{ fontWeight: 'bold' }}>Virtual Contest</h2>
          <p>
            Participate in virtual contests created by you or your friends using room IDs.
            Compete in peer programming and solve unsolved problems from Codeforces.
          </p>
        </section>

        <section className="section">
          <h2 style={{ fontWeight: 'bold' }}>Contest List</h2>
          <p>
            Explore upcoming coding contests from various coding contest platforms.
            Filter contests and access navigation links for easy participation.
          </p>
        </section>

        <section className="section">
          <h2 style={{ fontWeight: 'bold' }}>Profile</h2>
          <p>
            View your profile information from LeetCode and Codeforces.
            Get details about your coding handles and achievements.
          </p>
        </section>
      </div>

      <div className="right" style={{ flex: 2, position: 'relative' }}>
        {images.map((image, index) => (
          <center key={index}>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              style={{
                display: index === currentImageIndex ? 'block' : 'none',
                width: '70%',
                marginBottom: '20px',
                maxHeight: '50%',
                objectFit: 'contain',
                overflow: 'hidden'
              }}
            />
          </center>
        ))}


      </div>
    </div>


  );
};
export default Body;
