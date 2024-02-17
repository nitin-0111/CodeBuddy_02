import { toast } from "react-toastify";
import main from "../assets/images/main_welcome.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link, useNavigate } from "react-router-dom";
import "./DashBoard/CSS/LandingPage/Landing.css";
import { loginUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/CircularLoader";
const Landing = () => {
  const { isLoading } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <div className="container page">

        <div className="info">
          <h1>
            Welcome to <span>CodeBuddy! </span>
          </h1>

          <p>
            Level up your competitive programming and problem-solving skills
            with our powerful platform. Join CodeBuddy today and unleash your
            programming potential. Are you ready to dominate the coding arena?
            Sign in or create an account now to embark on your coding adventure!
          </p>
          <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
            <Link to="/register" className="btn waves-light waves-effect" style={{ marginRight: '10px', fontWeight: 'bold' }}>
              Login/Register
            </Link>


            <button
              disabled={isLoading}
              onClick={() => {
                dispatch(loginUser({ email: "test@abc.in", password: "123456" }));
                setTimeout(() => {
                  navigate("/");
                }, 2000);

                return;
              }} className="btn waves-light waves-effect" style={{ fontWeight: 'bold' }}>
              {isLoading ? "Loading... " : "Demo-User"}
            </button>
          </div>
        </div>
        <img src={main} alt="welcome img" className="img main-img"  />
      </div>
    </div>
  );
};

export default Landing;
