const express = require("express");
const app = express();
const { connectMongoDB } = require("./connect");
const cookieParser=require("cookie-parser");

const path = require("path");


const urlRoutes = require("./routes/url");
const staticRoutes = require("./routes/staticRoutes");
const userRoutes = require("./routes/user");
const {restrictedToLoggedInUserOnly , checkAuth}=require("./middleware/auth");
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));


const URL = require("./models/url");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url",restrictedToLoggedInUserOnly, urlRoutes);
app.use("/",checkAuth, staticRoutes);
app.use("/user", userRoutes);

// app.get("/test", async(req,res)=>{

//   const allUrls=await URL.find({});

//   res.render("home", {urls:allUrls});
// });


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
