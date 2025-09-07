const  {nanoid}=require("nanoid");
const URL=require("../models/url");
async function handleGenerateNewSholrURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"URL is required"});

    const shortID=nanoid(8);

    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[]
    });


    const allUrls= await URL.find({});
    // console.log("alll urls", allUrls);
    return res.render("home",{id:shortID,urlss:allUrls});
    // res.status(201).json({id:shortID});
}


async function handleGetAnalytics(req,res){
 const shortId=req.params.shortId;

 const result=await URL.findOne({shortId});

 return res.json({
    totalClicks:result.visitHistory.length,
    visitHistory:result.visitHistory
 });

}
    


module.exports={
    handleGenerateNewSholrURL,
    handleGetAnalytics,
}