import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import { FormRow } from "../components";
import { BASE_URL } from "../env";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [loading,setLoading]=useState(false);
  const {isLoading}=useSelector((store)=>store.user);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
    
     toast.error('Pls provoid email');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(BASE_URL+"/api/v1/auth/forgot-password", {
        email,
      });
      toast.success("Success");
    } catch (error) {
      
      toast.error("Something went wrong, please try again");
      
    }
    setLoading(false);
  };
  return (
    <Wrapper>
      <form
        className={loading ? "form form-loading" : "form"}
        onSubmit={handleSubmit}>
        <h4>Forgot password</h4>
        {/* single form row */}
        <FormRow
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
        />
        {/* end of single form row */}
        <button type="submit" className="btn btn-block" disabled={loading}>
          {loading ? "Please Wait..." : "Get Reset Password Link"}
        </button>
        <p>
          Already a have an account?
          <Link to="/login" className="login-link">
            Log In
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default ForgotPassword;
