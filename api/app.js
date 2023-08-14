require("dotenv").config();
require("express-async-errors");
//express
const express = require("express");
const app = express();

// rest of the package
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

// database
const connectDB = require("./db/connect");
app.use(morgan("tiny"));
//routers
const authRouter = require("./routes/authRoutes");
const userContestRouter = require("./routes/userContestinfo");
const vContestRouter=require('./routes/vContestRoutes')
// const testRouter=require('./routes')
// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/userContest", userContestRouter);
app.use("/api/v1/vcontest/", vContestRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Servers is listing on port ${port}....`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
