import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movimientos: []
}


export const movimientosSlice = createSlice({

    name: "rurbos",
    initialState,
    reducers: {
        guardarMovimientos: (state, action) => {
            state.movimientos = action.payload.movimientos;
            
        }
    },
})

export const { guardarMovimientos } = movimientosSlice.actions;
export default movimientosSlice.reducer;