const axios = require("axios");

const getProblems = async (handles, contestData) => {
  let users = handles;
  let num = contestData.num;
  let max = contestData.max;
  let min = contestData.min;
  let question = [];

  //   console.log(handles,contestData);

  let diff = new Array(num);
 
  try {
    // let contest_given = new Set();
    let solved = new Set();
    // gives contest history
    let ContestUrl = "https://codeforces.com/api/user.rating?handle=";


    // getting solved problems by all users 
    for (let i = 0; i < users.length; i++) {
      let handle = users[i];
      let modifiedURL = `https://codeforces.com/api/user.status?handle=${handle}`; //gives submited problems
      let resSolved = await axios.get(modifiedURL);
      resSolved = resSolved.data;
      if (resSolved.status !== "OK") {
        continue;
      }
      
      for (let i = 0; i < resSolved.result.length; i++) {
        if (resSolved.result[i].verdict === "OK") {
          let str =
            resSolved.result[i].problem.contestId +
            "-" +
            resSolved.result[i].problem.index;
          solved.add(str);
        }
      }
    }

      let problemSetURL = `https://codeforces.com/api/problemset.problems`;
      let problemsData = await axios.get(problemSetURL);

      problemsData = problemsData.data.result;

      for (let i = 0; i < problemsData.problems.length; i++) {
        // console.log(problemsData.problems[i]);
        let rating =
          problemsData.problems[i].rating !== undefined
            ? problemsData.problems[i].rating
            : 9999999999;
        if (
          solved.has(
            `${problemsData.problems[i].contestId}-${problemsData.problems[i].index}`
          ) === false &&
          rating >= min &&
          rating <= max
        ) {
          question.push([
            rating,
            `${problemsData.problems[i].contestId}-${problemsData.problems[i].index}`,
            problemsData.problems[i].name,
          ]);
        }
      }
      question = categorizeProblem(question, min, max, num);
        // console.log(question);
    
  } catch (err) {}

  //   console.log(question);
//   if(Array.isArray(question)){
//     console.log('arr');
//   }else if(typeof question==='string'){
//     console.log('str')
//   }
console.log(question);
  return question;
};

const categorizeProblem = async (problems, min, max, num) => {
  problems.sort((a, b) => a[0] - b[0]);
 

  // 4:3:2
  let hardsz = (num * 2) / 10;
  hardsz = Math.floor(hardsz);
  let midsz = (num * 3) / 10;
  midsz = Math.floor(midsz);
  let easysz = num - hardsz - midsz;
  // 4:3:2
  let rng = max - min;
  let easylt = min + rng * 0.4;
  let midlt = min + rng * 0.7;
  let hardlt = max;

  let easyprob = linear(problems, min, easylt, easysz);
  let midprob = linear(problems, easylt, midlt, midsz);
  let hardprob = linear(problems, midlt, max, hardsz);

  console.log(easysz, hardsz, midsz, easylt, midlt, hardlt);
 
    return [...easyprob, ...midprob, ...hardprob];
};
const linear = (problems, l, r, sz) => {
  let ques = [];
  let index=problems.map(problem => problem[0]);


  let step = (r - l) / sz;
  for (let i = 0; i < sz; i++) {
    const rt = l + step * i;
    
    let ind=binarySearch(index,rt);
    
    ques.push(problems[ind]);
  }
  return ques;
};

const binarySearch=(index,rating)=>{
  let l=0,r=index.length-1;
  while(l<=r)
  {
    const mid=Math.floor((l+r)/2);
    if(index[mid]>rating){
      r=mid-1;
    }
    else {
      l=mid+1
    }
  }
  return l;
}

module.exports = getProblems;
