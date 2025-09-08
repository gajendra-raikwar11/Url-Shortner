const User=require("../models/user");
const URL=require("../models/url");
const {v4:uuidv4} =require("uuid");
const {setUser}=require("../service/auth");


async function handleUserSignup(req,res){
    const {name, email, password}=req.body;

    if(!name || !email || !password){
        return res.status(400).json({error:"All fields are required"});
    }
  
    await User.create({
        name,
        email,
        password
    })

//    const url = await URL.create({
//         userId: user.id,
//         longUrl: req.body.longUrl,
//         shortUrl: `http://short.url/${user.id}`
//     })

    return res.render("login");
}


async function handleUserLogin(req,res){
    const {email,password}=req.body;
    const user= await User.findOne({email,password})
    if(!user){
        return res.render("login",{
            error:"Invalid email or password!!"
        })
    }
    const sessionId=uuidv4();
    setUser(sessionId,user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
}


module.exports={
    handleUserSignup,handleUserLogin
}