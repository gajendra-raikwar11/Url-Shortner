const express=require('express');
const {handleGenerateNewSholrURL ,handleGetAnalytics}=require("../controllers/url");

const router=express.Router();

router.post("/",handleGenerateNewSholrURL);
router.get("/analytics/:shortId",handleGetAnalytics);
module.exports=router;