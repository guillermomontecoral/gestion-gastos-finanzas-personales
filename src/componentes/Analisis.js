import { useEffect, useState, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { sumarTotal } from "../features/totalCategoriaSlice";

//Graficas
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Analisis = () => {

    const [movimiento, setMovimientos] = useState([]);

    const [movimientosFiltrados, setMovimientosFiltrados] = useState([]);

    const slcRubro = useRef(null);

    const dispatch = useDispatch();

    const [resto, setCompararGastosRubro] = useState([]);

    const rubroGasto = useSelector(state => state.obtenerR.rubrosGastos);
    const rubroIngreso = useSelector(state => state.obtenerR.rubrosIngresos);
    const movimientos = useSelector(state => state.guardarM.movimientos);

    const cate1 = useSelector(state => state.sumarT.categoria1);
    const cate2 = useSelector(state => state.sumarT.categoria2);
    const cate3 = useSelector(state => state.sumarT.categoria3);
    const cate4 = useSelector(state => state.sumarT.categoria4);
    const cate5 = useSelector(state => state.sumarT.categoria5);
    const cate6 = useSelector(state => state.sumarT.categoria6);
    const cate7 = useSelector(state => state.sumarT.categoria7);
    const cate8 = useSelector(state => state.sumarT.categoria8);
    const cate9 = useSelector(state => state.sumarT.categoria9);
    const cate10 = useSelector(state => state.sumarT.categoria10);
    const cate11 = useSelector(state => state.sumarT.categoria11);
    const cate12 = useSelector(state => state.sumarT.categoria12);


    let apiKey = localStorage.getItem("apiKeyUsuario");
    let idUsu = localStorage.getItem("idUsuario");

    useEffect(() => {
        fetch(`https://dwallet.develotion.com/movimientos.php?idUsuario=${idUsu}`, {
            headers: {
                "apikey": apiKey,
                "Content-type": "application/json"
            }
        })
            .then(r => r.json())
            .then(datos => {
                dispatch(sumarTotal(datos))
                setMovimientosFiltrados(datos.movimientos);
            });
    }, [])

    const compararGastosRubro = e => {
        rubroGasto.forEach(rg => {
            if (slcRubro.current.value === rg.nombre) {
                movimientos.forEach(m => {
                    if (rg.id === m.categoria) {
                        let resto = m.total[-1] - m.total[-2]
                        console.log(resto);
                        setCompararGastosRubro(resto)
                    }
                });
            }
        });
    }

    return (
        <div className="row flex-nowrap justify-content-center">
            <div className="col py-3">

                <section className="row justify-content-center">
                    {/* <!--LISTADO DE MOVIMIENTOS--> */}
                    <div className="mt-4">
                        <h2 className="text-uppercase text-center pt-5 pb-4 mb-5 titulo-seccion fs-1">Análisis</h2>
                        <div className="row gap-5 justify-content-center text-center mt-5">
                            <div className="col-8 card-analisis">
                                <h5 className="text-uppercase title-grafica p-3">Ingresos por rubro</h5>
                                <Bar options={{
                                    indexAxis: 'y',
                                    elements: {
                                        bar: {
                                            borderWidth: 2,
                                        },
                                    },
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'right',
                                        },
                                    },
                                }} data={{
                                    labels: rubroIngreso.map(r => r.nombre),
                                    datasets: [
                                        {
                                            label: 'Total',
                                            data: [cate7, cate8, cate9, cate10, cate11, cate12],
                                            backgroundColor: '#323340',
                                        }
                                    ],
                                }} />
                            </div>
                            <div className="col-8 card-analisis">
                                <h5 className="text-uppercase title-grafica p-3">Gastos por rubro</h5>
                                <Bar options={{
                                    indexAxis: 'y',
                                    elements: {
                                        bar: {
                                            borderWidth: 2,
                                        },
                                    },
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'right',
                                        },
                                    },
                                }} data={{
                                    labels: rubroGasto.map(r => r.nombre),
                                    datasets: [
                                        {
                                            label: 'Total',
                                            data: [cate1, cate2, cate3, cate4, cate5, cate6],
                                            backgroundColor: '#21416E',
                                        }
                                    ],
                                }} />
                            </div>
                            <div className="col-8 card-analisis">
                                <h5 className="text-uppercase title-grafica p-3">Evolución de gasto</h5>
                                <Bar options={{
                                    indexAxis: 'y',
                                    elements: {
                                        bar: {
                                            borderWidth: 2,
                                        },
                                    },
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'right',
                                        },
                                    },
                                }} data={{
                                    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                                    datasets: [
                                        {

                                            label: 'Total 2022',
                                            data: movimientosFiltrados.map(m => m.total),
                                            backgroundColor: '#21416E',
                                        }, 
                                        {
                                            label: 'Total 2023',
                                            data: movimientosFiltrados.map(m => m.total),
                                            backgroundColor: '#8C7161',
                                        }
                                    ],
                                }} />
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="text-uppercase mt-5">Análisis comparativo</h3>
                            <p>Comparativa de los dos últimos gastos en un
                                rubro</p>
                            <div className="row row-cols-lg-auto g-3 align-items-end my-4 justify-content-center">
                                <div className="col-5">
                                    <select className="form-select" id="slcRubro" defaultValue={'DEFAULT'} ref={slcRubro}>
                                        <option value="DEFAULT" disabled>Seleccione un rubro</option>
                                        {rubroGasto.map(elemento => (
                                            <option key={elemento.id} value={elemento.id} >{elemento.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <button type="submit" className="btn btn-form" onClick={compararGastosRubro}>Comparar</button>
                                </div>
                            </div>
                            <div>
                                <p>Para el rubro <span className="fw-bold">Alimentación</span>, en la
                                    última compra has gastado <span className="fw-bold">{resto}</span> pesos <span
                                        className="fw-bold">más</span> que en la
                                    penúltima</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Analisis