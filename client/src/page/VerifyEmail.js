import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {  useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
// import { } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const VerifyEmail = () => { 
   const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {isLoading}=useSelector((store)=>store.user);

  const query=useQuery();

  
  const verifyToken=async()=>{
    setLoading(true);
    try{
        const { data } = await axios.post('http://localhost:5000/api/v1/auth/verify-email', {
            verificationToken: query.get('token'),
            email: query.get('email'),
          });
          toast.success("Verified Email Please Login", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
    } catch(error){
      setError(true);
        const {msg}=error.response.data || 'There was an error';
        toast.error(msg, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!isLoading) {
      verifyToken();
    }
  }, []);
  if (loading) {
    return (
      <Wrapper className='page'>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper className='page'>
        <h4>There was an error, please double check your verification link </h4>
      </Wrapper>
    );
  }
  return (
    <Wrapper className='page'>
    <h2>Account Confirmed</h2>
    
    <Link to='/register' className='btn'>
      Please login
    </Link>
  </Wrapper>
  )
}

const Wrapper = styled.section``;
export default VerifyEmail