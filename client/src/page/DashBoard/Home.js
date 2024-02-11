import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Header />
       
      <Outlet />
      {/* <Footer/> */}
    </div>
  );
};
// import React from 'react';
// import './Home.css'; // Import your custom styles here

// const Home = () => {
//   return (

//   );
// };

// export default Home;

export default Home;
