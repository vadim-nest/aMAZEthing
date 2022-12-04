import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Config, names, uniqueNamesGenerator } from 'unique-names-generator';
import { GameStatsType } from '../components/game/game';
import { Graph } from '../utils/graph';
import { animal, minionType, TowerType } from '../utils/types';
import { initialGameState } from './game_initial_state';

const customConfig: Config = {
  dictionaries: [names]
}


const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    defaultState() {
      return initialGameState;
    },
    updateRoomID(state, action: PayloadAction<string>) {
      state.roomId = action.payload;
    },
    updatePlayer(state, action: PayloadAction<'p1' | 'p2'>) {
      state.currentPlayer = action.payload;
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
    },
    updateZoomed(state, action: PayloadAction<boolean>) {
      state.zoomed = action.payload;
    },
    updateGameEnded(state) {
      state.gameEnded = true;
    },
    addNewMinionState(state, action: PayloadAction<{type: animal, player: 'p1' | 'p2'}>) {
      const newId = Object.keys(state.minions).length;
      const {type, player} = action.payload;
      let playerSpecific = {
        xPos: 0,
        yPos: 3,
        alignment: 'p1' as 'p1' | 'p2'
      };
      if (player ===  'p2') {
        playerSpecific = {
          xPos: state.width - 1,
          yPos: state.height - 4,
          alignment: 'p2'
        }
      }
      state.minions[newId] = {
        id: newId,
        name: uniqueNamesGenerator(customConfig),
        rotation: 'minionR',
        path: [],
        thoughtProcess: [],
        inTower: false,
        ...playerSpecific,
        ...type
      }
    },
    opponentMinionMovement(state, action: PayloadAction<{direction: {xPos: number, yPos: number, rotation: 'minionU' | 'minionR' | 'minionL' | 'minionD' | '' }, minionId: number}>) {
      const {direction, minionId} = action.payload;
      const minionToUpdate = state.minions[minionId];
      minionToUpdate.xPos = minionToUpdate.xPos + direction.xPos,
      minionToUpdate.yPos = minionToUpdate.yPos + direction.yPos,
      minionToUpdate.rotation = direction.rotation
      state.minions[minionId] = minionToUpdate;
    },
    updateMinion(state, action: PayloadAction<{minionId: number, updatedMinion: minionType}>) {
      const {minionId, updatedMinion} = action.payload;
      state.minions[minionId] = updatedMinion;
    },
    minionEnterTower(state, action: PayloadAction<{minionId: number, towerId: number}>) {
      const {minionId, towerId} = action.payload;
      state.minions[minionId].yPos--;
      state.minions[minionId].inTower = towerId;
    },
    minionExitTower(state, action: PayloadAction<number>) {
      const minionId = action.payload;
      state.minions[minionId].yPos++;
      state.minions[minionId].inTower = false;
      state.minions[minionId].rotation = 'minionR';
    },
    updateCurrentTile(state, action: PayloadAction<null | {xPos: number, yPos: number}>) {
      state.currentTile = action.payload;
    },
    removeMovingMinion(state, action: PayloadAction<number>) {
      const minionId = action.payload;
      state.movingMinions = state.movingMinions.filter(id => id !== minionId);
    },
    addMovingMinion(state, action: PayloadAction<number>) {
      const minionId = action.payload;
      state.movingMinions = [...state.movingMinions, minionId];
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
  updateZoomed,
  updateGameEnded,
  addNewMinionState,
  opponentMinionMovement,
  updateMinion,
  minionEnterTower,
  minionExitTower,
  updateCurrentTile,
  removeMovingMinion,
  addMovingMinion
} = gameSlice.actions;
export default gameSlice.reducer;