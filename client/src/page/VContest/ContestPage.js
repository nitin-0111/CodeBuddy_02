import React from "react";
import { Outlet } from "react-router-dom";

const ContestPage = () => {
  // console.log("contest page");
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ContestPage;
