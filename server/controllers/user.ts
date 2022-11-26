import express from 'express'
import { User } from '../models/user'


async function getUserData(req: express.Request, res: express.Response) {
    try {
        const  {email} = req.oidc.user
        console.log('request opened to retrieve information from: ',email)
        const user = await User.findOne({ email: email })
        if (user) {
            res.status(201).json({ "statusCode": 200, "message": "Retrieving information of the user", user: user });
        } else {
            const newUser = new User({
                email: email,       
            });
            console.log(newUser)
            const user = await newUser.save();
            const userSaved = await User.findOne({ email: email })
            res.status(201).json({ "statusCode": 200, "message": "User created", user: userSaved });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "statusCode": 200, "message": error });
    }
}

async function updateUsername(req: express.Request, res: express.Response) {
    try {
        const username = req.body.username;
        const { email } = req.oidc.user;
        const user = await User.findOne({ email: email })
        user.username = username;
        await user.save();
        console.log(user);
        res.status(201).json({ "statusCode": 200, "message": "New username has been stored", user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ "statusCode": 200, "message": error });
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
        res.status(201).json({ "statusCode": 200, "message": "Learning path updated!", user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ "statusCode": 200, "message": error });
    }
}


async function updateGameStats(req: express.Request, res: express.Response) {
    try {
        const {game} = req.body
        const { email } = req.oidc.user;
        const user = await User.findOne({ email: email })
        
        await user.save();
        console.log(user);
        res.status(201).json({ "statusCode": 200, "message": "Learning path updated!", user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ "statusCode": 200, "message": error });
    }
}





export { getUserData, updateLearning, updateUsername,updateGameStats };