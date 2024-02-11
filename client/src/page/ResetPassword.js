import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FormRow } from "../components";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const ResetPassword = () => {
  const [loading, setLoading] = useState();
  const [creditional, setCreditional] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const query = useQuery();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCreditional({ ...creditional, [name]: value });
    console.log(creditional);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!creditional.password || !creditional.confirmPassword) {
      toast.error("pls.... fill all fields");
      return;
    }
    if (creditional.password !== creditional.confirmPassword) {
      toast.error("passwords are not Matching ");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/v1/auth/reset-password", {
        password: creditional.password,
        token: query.get("token"),
        email: query.get("email"),
      });
      setLoading(false);
      toast.success("successfully password change");
      setTimeout(() => {
        navigate("/register");
      }, 3000);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.msg);
    }
  };
  return (
    <Wrapper className="page">
      <form
        className={loading ? "form form-loading" : "form"}
        onSubmit={handleSubmit}>
        <h4>reset password</h4>
        {/* single form row */}
        <FormRow
          type="password"
          name="password"
          value={creditional.password}
          handleChange={handleChange}
          labelText="New Password"
        />
        <FormRow
          type="password"
          name="confirmPassword"
          value={creditional.confirmPassword}
          handleChange={handleChange}
          labelText="Confirm Password"
        />
        {/* end of single form row */}
        <button type="submit" className="btn btn-block" disabled={loading}>
          {loading ? "Please Wait..." : "New Password"}
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h4,
  p {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
  }
`;
export default ResetPassword;
