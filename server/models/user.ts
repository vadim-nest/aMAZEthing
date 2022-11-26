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
    type: String
  },
  towersTaken: {
    type: Number
  }
})

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    default: " "
  },
  sortingPath: {
    type: Number,
    default: 0
  },
  pathFindPath: {
    type: Number,
    default: 0
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

  }
})

const User = mongoose.model('Users', userSchema)

export { User }