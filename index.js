const express = require("express");

const urlRoute = require("./routes/url");

require("dotenv").config();

const { dbConnect } = require("./dbConnect");

const URL = require("./models/url");

const cookieParser = require("cookie-parser");

const path = require("path");

const staticRouter = require("./routes/staticRouters");

const userRoute = require("./routes/user");

const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

// ====================^^^^^^^^^^^^^^^^^^

const app = express();

const port = 8001;

dbConnect(process.env.MONGO_URL);

// ==================== EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// =====================  Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //  Form Data
app.use(cookieParser());
app.use(checkForAuthentication);

// ==================== Routes
app.use("/", staticRouter);
app.use("/url", restrictTo(["PUBLIC", "ADMIN"]), urlRoute);
app.use("/user", userRoute);

app.get("/home", async (req, res) => {
  const allUrls = await URL.find({});

  return res.render("home", { urls: allUrls }); // Render the home view with URLs
});

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timeStamp: Date.now() } } },
    { new: true }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(
  port,
  console.log(
    ` click me: ➡️  http://localhost:8001/ ✔️ Server Running on ${port}`
  )
);
