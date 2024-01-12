import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalGasto: 0,
    totalIngreso: 0,
    totalRestante: 0
}


export const contadorGastosIngresosSlice = createSlice({

    name: "contador",
    initialState,
    reducers: {
        incrementar: (state, datos) => {
            //console.log(datos);
            let sumaGastos = 0;
            let sumaIngresos = 0;
            datos.payload.movimientos.forEach(e => {
                if (e.categoria === 1 || e.categoria === 2 || e.categoria === 3 || e.categoria === 4 || e.categoria === 5 || e.categoria === 6) {
                    sumaGastos += e.total;
                    console.log("suma de totales", sumaGastos);
                }
                else {
                    sumaIngresos += e.total;
                    console.log("suma de totales", sumaIngresos);

                }
            });
            //console.log(datos);
            state.totalGasto = sumaGastos;
            state.totalIngreso = sumaIngresos;
            state.totalRestante = sumaIngresos - sumaGastos;
        }
    },
})

export const { incrementar } = contadorGastosIngresosSlice.actions;
export default contadorGastosIngresosSlice.reducer;