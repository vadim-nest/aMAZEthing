//single file to hold ALL the redux logic

//DUCKS pattern

import { createSlice, PayloadAction} from '@reduxjs/toolkit'

interface CounterState{ //shape of the state inside inside of the slice
    value: number;
}

const initialState: CounterState = {
    value: 0,
};


const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        //increment
        incremented(state){ //with redux toolkit you can do this LOOKS CONFUSING because is editing the state
            state.value++;
        },
        //decrement
        decremented(state){//uses a library named immer, tracks all the states and transform all the mutations to immutable state code afterwards
            state.value--;
        }
        //reset

    }
})

export const{ incremented } = counterSlice.actions;
export default counterSlice.reducer;
