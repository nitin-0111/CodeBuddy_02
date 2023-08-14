import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
// import Wrapper from "../assets/wrappers/RegisterPage";
import "./DashBoard/CSS/Register/Register.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// import { loginUser, registerUser } from '../features/user/userSlice';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUser, registerUser } from "../features/user/userSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Register = () => {
  const [values, setValues] = useState(initialState);

  // redux part
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isLoading,setisLoading]=useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      setTimeout(() => {
        navigate("/");
      }, 2000);

      return;
    }
    dispatch(registerUser({ name, email, password }));
    toast.success("GO AND CHECK YOUR EMAIL ");
    // setValues({name:'',email:'',password:''});
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  // useEffect(() => {
  //   if (user) {
  //     setTimeout(() => {
  //       navigate('/home');
  //     }, 2000);
  //   }
  // }, [user]);

  return (
    <div className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3> {values.isMember ? "Login" : "Register"}</h3>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        {/* Submit button  */}
        <button className="waves-effect waves-light btn-block btn" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
        {/* Demo button */}
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          // onClick={() =>
          //   dispatch(
          //     loginUser({ email: "testUser@test.com", password: "secret" })
          //   )
          // }
        >
          {isLoading ? "loading..." : "demo app"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
        <p>
          {values.isMember && "Forget Password?"}
          <Link to="/user/forget-password" className="member-btn">
            {values.isMember && "Reset password"}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
