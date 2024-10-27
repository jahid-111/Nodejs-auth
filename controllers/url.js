const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const { redirectUrl } = req.body; // Destructure redirectUrl from the request body

  if (!redirectUrl) return res.status(400).json({ error: "Url Required" });

  const shortID = shortid.generate();

  try {
    const newEntry = await URL.create({
      shortId: shortID,
      redirectUrl,
      visitHistory: [],
      createBy: req.user._id,
    });
    return res.render("home", { id: shortID });
  } catch (error) {
    console.error("Error creating URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };
