const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

// ============================ Routes
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/login", (req, res) => {
  res.render("login");
});

// ============================
// Auth Routes
// ============================

// ---------------------------- Authentication  -user
router.get("/", restrictTo(["PUBLIC", "ADMIN"]), async (req, res) => {
  const allUrl = await URL.find({ createBy: req.user._id });

  return res.render("home", { urls: allUrl }); //Passing  for Table  (analysis)
});

// ---------------------------- Authorization
router.get("/admin/urls", restrictTo(["PUBLIC", "ADMIN"]), async (req, res) => {
  const allUrl = await URL.find({});

  return res.render("home", { urls: allUrl });
});
module.exports = router;
