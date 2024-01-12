import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { incrementar } from "../features/contadorGastosIngresosSlice";
import { useDispatch } from 'react-redux'

const MontosTotales = () => {

    const dispatch = useDispatch();

    const contadorGasto = useSelector(state => state.contadorG.totalGasto);
    const contadorIngreso = useSelector(state => state.contadorG.totalIngreso);
    const contadorRestante = useSelector(state => state.contadorG.totalRestante);

    useEffect(() => {
        fetch(`https://dwallet.develotion.com/movimientos.php?idUsuario=${localStorage.getItem("idUsuario")}`, {
            headers: {
                "apikey": localStorage.getItem("apiKeyUsuario"),
                "Content-type": "application/json"
            }
        })
            .then(respuesta => respuesta.json())
            .then((datos) => {
                dispatch(incrementar(datos));
            });
    })


    return (
        <div className="row flex-nowrap justify-content-center">
            <div className="col py-3">

                <section className="pb-5 px-4">
                    {/*  <!--MONTOS TOTALES--> */}
                    <div className="mt-4">
                        <h2 className="text-uppercase text-center pt-5 pb-4 mb-5 titulo-seccion fs-1">Montos Totales</h2>
                        <div className="row gap-5 justify-content-center text-center mt-5">
                            <div className="col-md-3 card-totales">
                                <i className="bi bi-currency-dollar fw-semibold"></i>
                                <h3>{contadorGasto}</h3>
                                <p>Total de Gastos</p>
                            </div>
                            <div className="col-md-3 card-totales">
                                <i className="bi bi-currency-dollar fw-semibold"></i>
                                <h3>{contadorIngreso}</h3>
                                <p>Total de Ingresos</p>
                            </div>
                            <div className="col-md-3 card-totales">
                                {contadorRestante < 0 ? <i className="bi bi-currency-dollar text-danger fw-semibold"></i> : <i className="bi bi-currency-dollar text-success fw-semibold"></i>}
                                {contadorRestante < 0 ? <h3 className='text-danger'>{contadorRestante}</h3> : <h3 className='text-success'>{contadorRestante}</h3>}
                                <p>Saldo Restante</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default MontosTotales