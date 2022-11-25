require("dotenv").config();

import {mongoose} from './index'

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    amountMinions:{
        type:Number
    },
    result:{
        type:String
    },
    goldAmount:{
        type:Number
    },
    opponentID:{
        type: String
    },
    towersTaken: {
        type:Number
    }
 })


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
      },
      games:[
        gameSchema
      ],
      overallWins: {
        wins: {
            type:Number,
            default: 0
        },
        losses:{
            type:Number,
            default: 0
        },
        draws:{
            type:Number,
            default: 0
        }

      }
})

const User = mongoose.model('Users', userSchema)

export {User}