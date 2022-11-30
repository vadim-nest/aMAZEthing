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
    pathLessons:boolean[],
    sortLessons:boolean[],
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
    pathLessons:[],
    sortLessons:[false, false, false, false, false, false],
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
            state.sortLessons = action.payload.sortLessons;
            state.pathLessons = action.payload.pathLessons;
            state.avatar = action.payload.avatar;
        },
        refreshDataNoAvatar(state,action:PayloadAction<UserState>){
            state.username = action.payload.username;
        },
        refreshSortingPath(state, action: PayloadAction<UserState>){
            state.sortLessons = action.payload.sortLessons
        }
    }
})

export const{ refreshData, refreshDataNoAvatar, refreshSortingPath } = userSlice.actions;
export default userSlice.reducer;