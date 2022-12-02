import { createSlice, PayloadAction} from '@reduxjs/toolkit'

interface GameState{ //shape of the state inside inside of the slice
  roomId: string,
  player: 'p1' | 'p2'
}

const initialState: GameState = {
  roomId: '',
  player: 'p1',
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateRoomID(state, action: PayloadAction<string>) {
      state.roomId = action.payload;
    },
    updatePlayer(state, action: PayloadAction<'p1' | 'p2'>) {
      state.player = action.payload;
    }
  }
})

export const { updateRoomID, updatePlayer } = gameSlice.actions;
export default gameSlice.reducer;