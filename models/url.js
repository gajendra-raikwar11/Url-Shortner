const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true,
    },
    visitHistory:[{Timestamp: {type:Number}}],
},{Timeseries:true});


module.exports=mongoose.model('Url', urlSchema);