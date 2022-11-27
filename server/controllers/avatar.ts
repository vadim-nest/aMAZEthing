import express from 'express'
import { Avatar } from '../models/avatar'


async function getAvatars(req: express.Request, res: express.Response){
    try{
        const avatars = Avatar.find();
        res.status(201).send(avatars)
    }catch(err){
        res.status(500).send({err, message: 'Could not retrieve all avatars'})
    }
}



export { getAvatars }