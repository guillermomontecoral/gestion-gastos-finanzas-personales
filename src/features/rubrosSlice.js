import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rubrosGastos: [],
    rubrosIngresos: [],
    rubrosTodos: []
}


export const rubrosSlice = createSlice({

    name: "rurbos",
    initialState,
    reducers: {
        obtenerRubros: (state, action) => {
            state.rubrosGastos = action.payload.rubros.filter( e => e.tipo === "gasto")
            state.rubrosIngresos = action.payload.rubros.filter( e => e.tipo === "ingreso")
            state.rubrosTodos = action.payload.rubros

            //  console.log(state.rubrosIngresos)
            //  console.log(state.rubrosGastos)
            // console.log(state.rubrosGastos[1])
            // console.log(state.rubrosIngresos[2])
            // console.log(state.rubrosIngresos[3])
            // console.log(state.rubrosIngresos[4])
            // console.log(state.rubrosIngresos[5])
            
        }
    },
})

export const { obtenerRubros } = rubrosSlice.actions;
export default rubrosSlice.reducer;