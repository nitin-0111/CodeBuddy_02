import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
         yess doen

        {/* <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div> */}
      </main>
    </Wrapper>
  );
};
