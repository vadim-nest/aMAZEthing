import { createSlice, PayloadAction} from '@reduxjs/toolkit'
interface UserState{ //shape of the state inside inside of the slice
    email: string | undefined,
    username: string,
    games:any,
    overallWins:{
        wins:number,
        losses:number,
        draws:number
    },
    pathFindPath:boolean[],
    sortingPath:boolean[],
    avatar:{
        data:{
            data:number[]
        },
        contentType:string;
    },
}

const initialState: UserState = {
    email: 'bruce@lee.com',
    username: '',
    games: [],
    overallWins:{ wins:0, losses:0, draws:0},
    pathFindPath:[],
    sortingPath:[],
    avatar:{
        data:{
            data:[]
        },
        contentType: "monkey.png",
        
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        refreshData(state, action: PayloadAction<UserState>){
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.games = action.payload.games;
            state.overallWins = action.payload.overallWins;
            state.pathFindPath = action.payload.pathFindPath;
            state.sortingPath = action.payload.sortingPath;
            state.avatar = action.payload.avatar;
        },
        refreshDataNoAvatar(state,action:PayloadAction<UserState>){
            state.username = action.payload.username;
        },
        refreshSortingPath(state, action: PayloadAction<UserState>){
            state.sortingPath = action.payload.sortingPath
        }
    }
})

export const{ refreshData, refreshDataNoAvatar, refreshSortingPath } = userSlice.actions;
export default userSlice.reducer;