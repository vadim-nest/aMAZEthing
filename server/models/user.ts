require("dotenv").config();

import {mongoose} from './index'

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
      },
      lastName:{
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      sortingPath:{
        type:Number,
        default: 0
      },
      pathFindPath: {
        type:Number,
        default: 0
      }
})

const User = mongoose.model('Users', userSchema)

export {User}