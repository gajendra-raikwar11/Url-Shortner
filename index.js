const express = require("express");
const app = express();
const { connectMongoDB } = require("./connect");
const urlRoutes = require("./routes/url");

const URL = require("./models/url");

app.use(express.json());
app.use("/url", urlRoutes);

app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: { visitHistory: { Timestamp: Date.now() } }, // ✅ fixed
    }
  );
  console.log("entry", entry);
  if (!entry) return res.status(404).json({ error: "Not found" });

  res.redirect(entry.redirectURL); // ✅ fixed
});




const PORT = 3000;

connectMongoDB("mongodb://localhost:27017/url-shortner")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    cconsole.error("Failed to connect to MongoDB", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
