import { toast } from "react-toastify";
import main from "../assets/images/main_welcome.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link, useNavigate } from "react-router-dom";
import "./DashBoard/CSS/LandingPage/Landing.css";
import { loginUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/CircularLoader";
import { useEffect, useState } from "react";

import img1 from "../assets/images/landing_page_svg/1.svg";
import img2 from "../assets/images/landing_page_svg/2.svg";
import img3 from "../assets/images/landing_page_svg/3.svg";
import img4 from "../assets/images/landing_page_svg/4.svg";
import img5 from "../assets/images/landing_page_svg/5.svg";
import img6 from "../assets/images/landing_page_svg/6.svg";
import img7 from "../assets/images/landing_page_svg/7.svg";
import img8 from "../assets/images/landing_page_svg/8.svg";
import img9 from "../assets/images/landing_page_svg/9.svg";
import img10 from "../assets/images/landing_page_svg/10.svg";
import img11 from "../assets/images/landing_page_svg/11.svg";


const Landing = () => {

  const mainImg = [
    { title: "code_typing", img: img1 },
    { title: "code_typing", img: img2 },
    { title: "code_typing", img: img3 },
    { title: "code_typing", img: img4 },
    { title: "code_typing", img: img5 },
    { title: "code_typing", img: img6 },
    { title: "code_typing", img: img7 },
    { title: "code_typing", img: img8 },
    { title: "code_typing", img: img9 },
    { title: "code_typing", img: img10 },
    { title: "code_typing", img: img11 }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % mainImg.length);
    }, 3000); // Change the interval as per your requirement (in milliseconds)

    return () => clearInterval(interval);
  }, [mainImg.length]);
  const { isLoading } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <div className="container page">

        <div className="info">
          <h1>
            Welcome to <span>CodeBuddy!</span>
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
        {mainImg.map((image, index) => (
          <img
            key={index}
            src={image.img}
            alt={image.title}
            className='img main-img'
            style={{ display: index === currentIndex ? 'block' : 'none' 
            
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Landing;
