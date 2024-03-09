import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { Landing, Register, Error } from "./page";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import toast from "./components/customToast";
import VerifyEmail from "./page/VerifyEmail";
import Home from "./page/DashBoard/Home";
import ForgotPassword from "./page/ForgotPassword";
import ResetPassword from "./page/ResetPassword";
import ProtectedRoute from "./page/ProtectedRoute";
import Profile from "./page/DashBoard/Profile";
import Contest from "./page/Contest/test";


// V-contest routes
import {
  GetHandle,
  Dashboard,
  ContestArea,
  Lobby,
  Standings,
  ContestPage,
  CreateContest,
  Problems,
  ProtectedContestRoute,
  AddHandles,
} from "./page/VContest/index";
import React from "react";
import Body from "./page/DashBoard/Home_body";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute>   <Home />   </ProtectedRoute>}>
          <Route index path="/" element={<Body />} />

          <Route path="profile" element={<Profile />} />
          <Route path="contest-list" element={<Contest />} />

          {/* v_contest creatation  routes */}
          
          <Route path="/vcontest" element={<VContest />}>
            <Route index path="getHandle" element={<GetHandle />} />
            <Route path="dashboard/:handle" element={<Dashboard />} />
            <Route path="createContest/:handle" element={<CreateContest />} />
            <Route path="AddHandle/:RoomId" element={<AddHandles />} />
          </Route>
          <Route
            path="/ContestArea/:RoomId/:handle"
            element={<ProtectedContestRoute><ContestPage /></ProtectedContestRoute>}>
            <Route index element={<Lobby />} />
            <Route path="ContestArea" element={<ContestArea />}>
              <Route index path="problems" element={<Problems />} />
              <Route path="standings" element={<Standings />} />
            </Route>
          </Route>
          {/* <Route */}
        </Route>

        {/* user auth routes  */}
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="/user/verify-email" element={<VerifyEmail />} />
        <Route path="/user/forget-password" element={<ForgotPassword />} />
        <Route path="/user/reset-password" element={<ResetPassword />} />

        <Route path="*" element={<Error />} />
      </Routes>
      {/* <ToastContainer position="top-center" /> */}
      {toast.container()}
    </BrowserRouter>
  );
}

const VContest = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/vcontest/getHandle");
  }, []);
  return (
    <div style={{ height: 'calc(100vh - 140px)' }}>
      <Outlet />
    </div>

  );
};
export default App;
