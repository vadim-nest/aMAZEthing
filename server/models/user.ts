import { mongoose } from './index'

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  amountMinions: {
    type: Number
  },
  result: {
    type: String
  },
  goldAmount: {
    type: Number
  },
  opponentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  towersTaken: {
    type: Number
  },
  winner:{
    type: Boolean
  },
  startedAt:{
    type: Date
  },
  finishedAt:{
    type: Date
  },
  duration:{
    type:Date
  }
})

const userSchema = new Schema({
  id:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    default: " "
  },
  sortLessons: {
    type: [Boolean],
    default: false
  },
  totalGold: {
    type: Number,
    default: 0
  },
  pathLessons:  {
    type: [Boolean],
    default: false
  },
  games: [
    gameSchema
  ],
  overallWins: {
    wins: {
      type: Number,
      default: 0
    },
    losses: {
      type: Number,
      default: 0
    },
    draws: {
      type: Number,
      default: 0
    }
  },
  avatar:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Avatar',
    require:true
  }
})

const User = mongoose.model('User', userSchema)

export { User }