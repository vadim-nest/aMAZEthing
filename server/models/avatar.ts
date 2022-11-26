import { mongoose } from './index'
const Schema = mongoose.Schema;

const avatarSchema = new Schema({
    
    data: Buffer,
    contentType: String
    
});
const Avatar = mongoose.model('Avatar', avatarSchema);

export { Avatar }