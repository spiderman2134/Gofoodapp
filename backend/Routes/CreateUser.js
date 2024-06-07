const express=require('express');
const router=express.Router();
const User=require('../models/User');
const {body,validationResult}=require('express-validator');
const jwt =require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const jwtSecret="apssionatecomputersceincestudentwithgoodcommunicationskills";
router.post("/CreateUser",[
body('email').isEmail(),
body('name').isLength({min:5}),
body('password','Incorrect Password').isLength({min:5})]
,async (req,res)=>{
       const salt =await bcrypt.genSalt(10);
       let secpassword=await bcrypt.hash(req.body.password,salt);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
await User.create({
    name:req.body.name,
    location:req.body.location,
    email:req.body.email,
    password:secpassword
});
res.json({success:true});
    }
    catch(error){
        console.log(error);
        res.json({success:false});
    }
});
router.post("/loginuser",[
    body('email').isEmail(),
    body('password','Incorrect Password').isLength({min:5})],
    async (req,res)=>{
        const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
        let email=req.body.email;
        try{
   let userData= await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors:"There was a problem logging in. Check your email and password or create an account."});

        }
        const pwdcompare=await bcrypt.compare(req.body.password,userData.password);

        if(!pwdcompare){
            return res.status(400).json({errors:"There was a problem logging in. Check your email and password or create an account."}); 
        }
        const data={
            user:{
                id:userData.id
            }
        }
        const authToken=jwt.sign(data,jwtSecret);
        return res.json({success:true,authToken:authToken});
        }
        catch(error){
            console.log(error);
            res.json({success:false});
        }
    });
module.exports=router;