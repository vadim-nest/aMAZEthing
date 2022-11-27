import express from 'express'
import { User } from '../models/user'
import {Avatar} from '../models/avatar'


async function getUserData(req: express.Request, res: express.Response) {
    try {
        const  {email,sub} = req.oidc.user
        console.log('request opened to retrieve information from: ',email)
        const user = await User.findOne({ email: email })
        if (user) {
            const resUser = await User.findOne({ email: email }).populate('avatar');
            res.status(201).json({ "statusCode": 201, "message": "Retrieving information of the user", user: resUser });
        } else {
            const username = email.substr(0,email.indexOf('@'));
            const avatar = await Avatar.findOne({'contentType': 'monkey.png'});
            const newUser = new User({
                id: sub,
                email: email,
                username: username,
                avatar:avatar.id, 
            });
            await newUser.save();
            const resUser = await User.findOne({ email: email }).populate('avatar');
            res.status(201).json({ "statusCode": 201, "message": "User created", user: resUser });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "statusCode": 500, "message": error });
    }
}

async function updateUsername(req: express.Request, res: express.Response) {
    try {
        const {username} = req.body;
        console.log(username);
        const { email } = req.oidc.user;
        const user = await User.findOne({ email: email })
        user.username = username;
        await user.save();
        console.log(user);
        res.status(201).json({ "statusCode": 201, "message": "New username has been stored", user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ "statusCode": 500, "message": error });
    }
}


async function updateLearning(req: express.Request, res: express.Response) {
    try {
        const {sortingPath, pathFindPath} = req.body
        const { email } = req.oidc.user;
        const user = await User.findOne({ email: email })
        user.sortingPath = sortingPath;
        user.pathFindPath = pathFindPath;
        await user.save();
        console.log(user);
        res.status(201).json({ "statusCode": 201, "message": "Learning path updated!", user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ "statusCode": 500, "message": error });
    }
}


async function updateGameStats(req: express.Request, res: express.Response) {
    try {
        const {game} = req.body
        const { email } = req.oidc.user;
        const user = await User.findOne({ email: email })
        
        await user.save();
        console.log(user);
        res.status(201).json({ "statusCode": 201, "message": "Learning path updated!", user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ "statusCode": 500, "message": error });
    }
}





export { getUserData, updateLearning, updateUsername,updateGameStats };