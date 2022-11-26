import express from 'express'
import { Avatar } from '../models/avatar'




async function uploadImage(req: express.Request, res: express.Response){
    const file = req.file
    if (!file) {
        res.status(501).json('Please upload a file')
    }
    console.log(file)
    //const savedImage = await Avatar.create(re);
    res.send(file);
}



export {uploadImage}