const fs = require('fs');
const path = require('path')
import { Avatar } from "../models/avatar";
import { User } from "../models/user";
const files = fs.readdirSync(__dirname + '/avatars');

const automateImages = async function () {
    await User.deleteMany();
    await Avatar.deleteMany();
    for (let file of files) {
        console.log(file);
        const image = new Avatar({
            data: fs.readFileSync(path.join(__dirname + '/avatars/' + file)),
            contentType: file
        })
        await image.save();
    }
}
export { automateImages }
