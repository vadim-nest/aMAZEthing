import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { GameStatsType } from '../components/game/game';
import { Graph } from '../utils/graph';
import { TowerType } from '../utils/types';
import { initialGameState } from './game_initial_state';



const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    defaultState(state) {
      return initialGameState;
    },
    updateRoomID(state, action: PayloadAction<string>) {
      state.roomId = action.payload;
    },
    updatePlayer(state, action: PayloadAction<'p1' | 'p2'>) {
      state.player = action.payload;
    },
    zoomIn(state, action: PayloadAction<number>) {
      state.currentTower = null;
      state.zoomed = true;
      if (state.boxSize + action.payload > state.maxBoxSize) state.boxSize = state.maxBoxSize;
      else state.boxSize += action.payload;
    },
    zoomOut(state, action: PayloadAction<number>) {
      state.currentTower = null;
      state.zoomed = true;
      if (state.boxSize - action.payload < state.minBoxSize) state.boxSize = state.minBoxSize;
      else state.boxSize -= action.payload;
    },
    mazeComplete(state) {
      state.mazeCompleted = true;
    },
    setWaitingForTile(state, action: PayloadAction<boolean>) {
      state.waitingForTile = action.payload;
    },
    setCurrentGraph(state, action: PayloadAction<Graph>) {
      state.currentGraph = action.payload;
    },
    setAllTilesHidden(state, action: PayloadAction<boolean>) {
      state.allTilesHidden = action.payload;
    },
    updateCurrentMinion(state, action: PayloadAction<null | number>) {
      state.currentMinion = action.payload;
    },
    updateCurrentTower(state, action: PayloadAction<null | TowerType>) {
      state.currentTower = action.payload;
    },
    updateGameStats(state, action: PayloadAction<GameStatsType>) {
      state.gameStats = action.payload;
    },
    finalGameStats(state) {
      state.finalGameStats = state.gameStats;
    }
  }
})

export const { 
  defaultState, 
  updateRoomID, 
  updatePlayer, 
  zoomIn, 
  zoomOut, 
  mazeComplete,
  setWaitingForTile,
  setCurrentGraph,
  setAllTilesHidden,
  updateCurrentMinion,
  updateCurrentTower,
  updateGameStats,
  finalGameStats,
} = gameSlice.actions;
export default gameSlice.reducer;