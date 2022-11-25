import express from 'express'
import {User} from '../models/user'



async function getUserData(req:express.Request, res:express.Response){
    try {
        const {email} = req.oidc.user;
        const user = await User.findOne({email:email})
        console.log(user);
        if(user){
            res.status(201).json({ "statusCode": 200, "message": "Retrieving information of the user" ,user:req.oidc.user}); 
        }else{
            const newUser = new User({
                ...req.oidc.user,
              });
        res.status(201).json({ "statusCode": 200, "message": "User created" ,user:req.oidc.user}); 
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ "statusCode": 200, "message": error });
      }
}

async function UpdateUserData(req:express.Request, res:express.Response){
    try {
        const {email} = req.oidc.user;
        const user = await User.findOne({email:email})
        console.log(user);
        if(user){
            res.status(201).json({ "statusCode": 200, "message": "Retrieving information of the user" ,user:req.oidc.user}); 
        }else{

        }
        //mongose check if user cread
        
      } catch (error) {
        console.log(error);
        res.status(500).json({ "statusCode": 200, "message": error });
      }
}
export { getUserData, UpdateUserData };