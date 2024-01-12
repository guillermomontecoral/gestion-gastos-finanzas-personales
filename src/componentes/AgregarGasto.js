import React from 'react'
import { useEffect, useState, useRef } from 'react';
import {useSelector } from 'react-redux'

const AgregarGasto = () => {

    // const [rubro, setRubro] = useState([]);
    const [mensaje, setMensaje] = useState("")
    const [desahabilitar, setDesahabilitar] = useState(true);

    const txtConceptoGasto = useRef(null);
    const slcRubroGasto = useRef(null);
    const slcMonedaGasto = useRef(null);
    const numTotalgasto = useRef(null);
    const fechaGasto = useRef(null);

    const rubroGasto = useSelector(state => state.obtenerR.rubrosGastos);

    

    const btnAgregarGasto = () => {

        let objAgregarGasto = {
            "idUsuario": localStorage.getItem("idUsuario"),
            "concepto": txtConceptoGasto.current.value,
            "categoria": slcRubroGasto.current.value,
            "total": numTotalgasto.current.value,
            "medio": slcMonedaGasto.current.value,
            "fecha": fechaGasto.current.value
        }

        fetch('https://dwallet.develotion.com/movimientos.php', {
            method: 'POST',
            body: JSON.stringify(objAgregarGasto),
            headers: {
                "apikey": localStorage.getItem("apiKeyUsuario"),
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
            txtConceptoGasto.current.value !== ""
            && slcRubroGasto.current.value !== "DEFAULT"
            && numTotalgasto.current.value !== ""
            && slcMonedaGasto.current.value !== "DEFAULT"
            && fechaGasto.current.value !== ""
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
                    {/* <!--AGREGAR GASTOS--> */}
                    <h2 className="text-uppercase text-center pt-5 pb-4 mb-5 titulo-seccion fs-1">Agregar un gasto</h2>
                    <div className='row gap-3 justify-content-center contenedor-form contenedor-form-gasto m-auto py-5'>
                        <div className="col-12 col-lg-8 mb-3 px-lg-5">
                            <label htmlFor="txtConceptoGasto" className="form-label  fw-semibold">Concepto de gasto</label>
                            <input type="text" className="form-control" id="txtConceptoGasto" ref={txtConceptoGasto} onChange={ () => {activarBtn(); limpiarMensaje(); }} />
                        </div>
                        <div className="col-12 col-lg-8 mb-3 px-lg-5">
                            <label className="form-label  fw-semibold" htmlFor='slcRubro'>Rubro</label>
                            <select className="form-select" id="slcRubro" defaultValue={'DEFAULT'} ref={slcRubroGasto} onChange={ () => {activarBtn(); limpiarMensaje(); }}>
                                <option value="DEFAULT" disabled>Seleccione un rubro</option>
                                {rubroGasto.map(elemento => (
                                    <option key={elemento.id} value={elemento.id} >{elemento.nombre}</option> 
                                ))}
                            </select>
                        </div>
                        <div className="col-12 col-lg-8 mb-3 px-lg-5">
                            <label className="form-label  fw-semibold" htmlFor='slcMedioPago'>Medio de pago</label>
                            <select className="form-select" id="slcMedioPago" defaultValue={'DEFAULT'} ref={slcMonedaGasto} onChange={ () => {activarBtn(); limpiarMensaje(); }}>
                                <option value="DEFAULT" disabled>Seleccione un medio de pago</option>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Debito">Débito</option>
                                <option value="Credito">Crédito</option>
                            </select>
                        </div>
                        <div className="col-12 col-lg-8 mb-3 px-lg-5">
                            <label htmlFor="numbTotal" className="form-label  fw-semibold">Total</label>
                            <input type="number" className="form-control" id="numbTotal" ref={numTotalgasto} onChange={ () => {activarBtn(); limpiarMensaje(); }} />
                        </div>
                        <div className="col-12 col-lg-8 mb-3 px-lg-5">
                            <label htmlFor="fchFecha" className="form-label  fw-semibold">Fecha del gasto</label>
                            <input type="date" className="form-control" id="fchFecha" ref={fechaGasto} onChange={ () => {activarBtn(); limpiarMensaje(); }} />
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <input disabled={desahabilitar} type="submit" className="btn btn-form " value="Agregar gasto" onClick={btnAgregarGasto} />
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

export default AgregarGasto