import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoria1: 0,
    categoria2: 0,
    categoria3: 0,
    categoria4: 0,
    categoria5: 0,
    categoria6: 0,
    categoria7: 0,
    categoria8: 0,
    categoria9: 0,
    categoria10: 0,
    categoria11: 0,
    categoria12: 0,
}


export const totalCategoriaSlice = createSlice({

    name: "total",
    initialState,
    reducers: {
        sumarTotal: (state, datos) => {
            let cate1 = 0;
            let cate2 = 0;
            let cate3 = 0;
            let cate4 = 0;
            let cate5 = 0;
            let cate6 = 0;
            let cate7 = 0;
            let cate8 = 0;
            let cate9 = 0;
            let cate10 = 0;
            let cate11 = 0;
            let cate12 = 0;

            datos.payload.movimientos.forEach(e => {
                
                switch (e.categoria) {
                    case 1:
                        cate1 += e.total
                        break;
                    case 2:
                        cate2 += e.total
                        break;
                    case 3:
                        cate3 += e.total
                        break;
                    case 4:
                        cate4 += e.total
                        break;
                    case 5:
                        cate5 += e.total
                        break;
                    case 6:
                        cate6 += e.total
                        break;
                    case 7:
                        cate7 += e.total
                        console.log("suma de de la categoria 7", cate7);
                        break;
                    case 8:
                        cate8 += e.total
                        break;
                    case 9:
                        cate9 += e.total
                        break;
                    case 10:
                        cate10 += e.total
                        break;
                    case 11:
                        cate11 += e.total
                        break;
                    case 12:
                        cate12 += e.total

                        break;

                    default:
                        console.log('No existe esa categoria');
                }

            });

            state.categoria1 = cate1;
            state.categoria2 = cate2;
            state.categoria3 = cate3;
            state.categoria4 = cate4;
            state.categoria5 = cate5;
            state.categoria6 = cate6;
            state.categoria7 = cate7;
            state.categoria8 = cate8;
            state.categoria9 = cate9;
            state.categoria10 = cate10;
            state.categoria11 = cate11;
            state.categoria12 = cate12;
        }
    },
})

export const { sumarTotal } = totalCategoriaSlice.actions;
export default totalCategoriaSlice.reducer;