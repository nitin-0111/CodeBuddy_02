import React from 'react'
import Wrapper from '../../assets/wrappers/LandingPage'
import  './singalContest.css'
const singalContest = ({contest}) => {
  return (
    // <Wrapper>
    <div class="tableitem">
    <a href={contest.href} target="_blank">
     <div class="details">
      <img class="logo" src="images/${logo.get(contest.resource)}" alt="png" />
      <span>{conEvent}</span>
      <p>Started At: <strong>${date} ${time[1]}</strong></p>
      <p>Duration: ${timeDuration} </p>
      </div>
      </a>
       <div class="alarm">
        <i class="fa-solid fa-bell" id="id${contest.id}"></i> 
      </div>
    </div>
    // </Wrapper>
  )
}

export default singalContest