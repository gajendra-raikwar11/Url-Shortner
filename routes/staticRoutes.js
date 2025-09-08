const express=require("express");
const URL=require("../models/url");
const router=express.Router();


router.get("/",async(req,res)=>{
    if(!req.user) return res.redirect("/login");
    const allurls= await URL.find({createdBy: req.user._id});
    return res.render("home" ,{urlss: allurls});

    return res.render("home");
});


router.get("/signup", (req,res)=>{
    res.render("signup");
})

router.get("/login", (req,res)=>{
    res.render("login");
})
module.exports=router;
