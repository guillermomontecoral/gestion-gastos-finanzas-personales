import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux'

const AgregarIngreso = () => {

    const [desahabilitar, setDesahabilitar] = useState(true);
    const [mensaje, setMensaje] = useState("")

    const txtConceptoIngreso = useRef(null);
    const slcRubroIngreso = useRef(null);
    const slcMonedaIngreso = useRef(null);
    const numTotalIngreso = useRef(null);
    const fechaIngreso = useRef(null);

    const rubroIngreso = useSelector(state => state.obtenerR.rubrosIngresos);


    let apiKey = localStorage.getItem("apiKeyUsuario");
    let idUsu = localStorage.getItem("idUsuario");

    const btnAgregarIngreso = () => {
        let objAgregarIngreso = {
            "idUsuario": idUsu,
            "concepto": txtConceptoIngreso.current.value,
            "categoria": slcRubroIngreso.current.value,
            "total": numTotalIngreso.current.value,
            "medio": slcMonedaIngreso.current.value,
            "fecha": fechaIngreso.current.value
        }

        fetch('https://dwallet.develotion.com/movimientos.php', {
            method: 'POST',
            body: JSON.stringify(objAgregarIngreso),
            headers: {
                "apikey": apiKey,
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then(respuesta => respuesta.json())
            .then((datos) => {
                if (datos.codigo === 200) {
                    console.log(datos.mensaje);
                    setMensaje(datos.mensaje);

                }
                else {
                    setMensaje('Error!')
                }

            });
    }

    const activarBtn = e => {
        if (
            txtConceptoIngreso.current.value !== ""
            && slcRubroIngreso.current.value !== "DEFAULT"
            && numTotalIngreso.current.value !== ""
            && slcMonedaIngreso.current.value !== "DEFAULT"
            && fechaIngreso.current.value !== ""
        ) {
            setDesahabilitar(false);
        }
    }

    const limpiarMensaje = e => {
        setMensaje("")
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setMensaje("");
        }, 8000);
        return () => clearTimeout(timer);
      }, [mensaje]);

    return (
        <div className="row flex-nowrap justify-content-center">
            <div className="col py-3">
                <section className="pb-5">
                    {/* <!--AGREGAR INGRESOS--> */}
                    <h2 className="text-uppercase text-center pt-5 pb-4 mb-5 titulo-seccion fs-1">Agregar un ingreso</h2>
                    <div className='row gap-3 justify-content-center contenedor-form contenedor-form-ingreso m-auto py-5'>
                        <div className="col-12 col-lg-8 mb-3 px-lg-5">
                            <label htmlFor="txtConceptoIngreso" className="form-label fw-semibold">Concepto de
                                ingreso</label>
                            <input type="text" className="form-control" id="txtConceptoIngreso" ref={txtConceptoIngreso} onChange={() => { activarBtn(); limpiarMensaje(); }} />
                        </div>
                        <div className="col-12 col-lg-8 mb-3 px-lg-5">
                            <label className="form-label  fw-semibold" htmlFor='slcRubro'>Rubro</label>
                            <select className="form-select" id="slcRubro" defaultValue={'DEFAULT'} ref={slcRubroIngreso} onChange={() => { activarBtn(); limpiarMensaje(); }} >
                                <option value="DEFAULT" disabled>Seleccione un rubro</option>
                                {rubroIngreso.map(elemento => (
                                    <option key={elemento.id} value={elemento.id} >{elemento.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 col-lg-8 mb-3 px-lg-5">
                            <label className="form-label fw-semibold" htmlFor='slcMedioPagoIngreso'>Medio de pago</label>
                            <select className="form-select" id="slcMedioPagoIngreso" defaultValue={'DEFAULT'} ref={slcMonedaIngreso} onChange={() => { activarBtn(); limpiarMensaje(); }} >
                                <option value="DEFAULT" disabled>Seleccione un medio de pago</option>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Banco">Banco</option>
                            </select>
                        </div>
                        <div className="col-12 col-lg-8 mb-3 px-lg-5">
                            <label htmlFor="numbTotalIngresos" className="form-label fw-semibold">Total</label>
                            <input type="number" className="form-control" id="numbTotalIngresos" ref={numTotalIngreso} onChange={() => { activarBtn(); limpiarMensaje(); }} />
                        </div>
                        <div className="col-12 col-lg-8 mb-3 px-lg-5">
                            <label htmlFor="fchFechaIngresos" className="form-label fw-semibold">Fecha del ingreso</label>
                            <input type="date" className="form-control" id="fchFechaIngresos" ref={fechaIngreso} onChange={() => { activarBtn(); limpiarMensaje(); }} />
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <input disabled={desahabilitar} type="submit" className="text-uppercase btn btn-form " value="Agregar ingreso" onClick={btnAgregarIngreso} />
                        </div>
                        <div className=" text-center fw-semibold text-success">
                            {mensaje}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AgregarIngreso