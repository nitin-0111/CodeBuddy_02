import { toast } from "react-toastify";
import main from "../assets/images/main_welcome.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
import "./DashBoard/CSS/LandingPage/Landing.css";
const Landing = () => {
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

          <Link to="/register" className="btn waves-light waves-effect">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="welcome img" className="img main-img" />
      </div>
    </div>
  );
};

export default Landing;
