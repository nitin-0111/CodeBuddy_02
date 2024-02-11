

const Render = ({codeforcesData}) => {
    const {userName,userProfile}=codeforcesData;
  return (
    <div>
        
       
        <b> {userName} {userProfile.rank}</b>
        <span> Contest Rank: </span>
        <b>{` Contest Rank: ${userProfile[0].rating} (max. ${userProfile[0].maxRank} ${userProfile[0].maxRating})`}</b>


    </div>
  )
}

export default Render;