import { configureStore } from "@reduxjs/toolkit";
import contadorGastosIngresosReducer from "../features/contadorGastosIngresosSlice"
import totalCategoriaReducer from "../features/totalCategoriaSlice";
import rubrosReducer from "../features/rubrosSlice";
import movimientosReducer from "../features/movimientosSlice";

export const store = configureStore({
    reducer:{
        contadorG: contadorGastosIngresosReducer,
        sumarT: totalCategoriaReducer,
        obtenerR: rubrosReducer,
        guardarM: movimientosReducer
    }
});