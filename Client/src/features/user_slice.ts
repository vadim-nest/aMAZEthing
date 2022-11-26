
import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useAuth0} from '@auth0/auth0-react'

// const { user } = useAuth0()
interface UserState{ //shape of the state inside inside of the slice
    email: string | undefined;
}

const initialState: UserState = {
    // email: user.email,
    email: 'josep',

}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        refreshData(state, action: PayloadAction<string|undefined>){
            state.email = action.payload;
            //request data to backend
        },
    }
})

export const{ refreshData } = userSlice.actions;
export default userSlice.reducer;