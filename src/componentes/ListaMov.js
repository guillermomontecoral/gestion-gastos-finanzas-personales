import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ListaMov = () => {

    const [movimientosFiltrados, setMovimientosFiltrados] = useState([]);
    // const [rubro, setRubro] = useState([]);
    const [eliminado, setEliminado] = useState(false)
    const [vacioMov, setVacioMov] = useState(false)

    const slcFiltrado = useRef(null)

    const rubroGasto = useSelector(state => state.obtenerR.rubrosGastos);
    const rubroIngreso = useSelector(state => state.obtenerR.rubrosIngresos);
    const rubroTodo = useSelector(state => state.obtenerR.rubrosTodos);
    const movimientos = useSelector(state => state.guardarM.movimientos);

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
                setMovimientosFiltrados(datos.movimientos);
            });
    }, [eliminado]) //No utilizo el array de dependencias para cada vez que hay un nuevo movimiento se actualice

    useEffect(() => {
        const timer = setTimeout(() => {
            setEliminado(false);
        }, 8000);
        return () => clearTimeout(timer);
    }, [eliminado]);

    const filtrado = e => {
        if (slcFiltrado.current.value === "gasto") {
            let movG = movimientos.filter(m => {
                let rubro = rubroGasto.find(r => r.id === m.categoria)
                return rubro
            })

            if (movG.length === 0) {
                setVacioMov(true);
            }
            setMovimientosFiltrados(movG)
            console.log(movG)


        }

        else if (slcFiltrado.current.value === "ingreso") {
            let movI = movimientos.filter(m => {
                let rubro = rubroIngreso.find(r => r.id === m.categoria)
                return rubro
            })

            if (movI.length === 0) {
                setVacioMov(true);
            }

            setMovimientosFiltrados(movI)
            console.log(movI)
        }

        else if (slcFiltrado.current.value === "todos") {
            if (movimientos.length === 0) {
                setVacioMov(true);
            }

            setMovimientosFiltrados(movimientos)

            console.log(movimientosFiltrados)
        }
    }

    const limpiarCampos = e => {
        setVacioMov(false);
    }

    return (
        <div className="row flex-nowrap justify-content-center">
            <div className="col py-3">
                <section className="pb-5">
                    {/* <!--LISTADO DE MOVIMIENTOS--> */}
                    <h2 className="text-uppercase text-center pt-5 pb-4 mb-5 titulo-seccion fs-1">Listado de movimientos</h2>
                    <div className="row row-cols-lg-auto gap-3 align-items-end my-4 justify-content-center">
                        <div className="col-12 col-md-5">
                            <label htmlFor="slcFiltrar" className="form-label fw-semibold">Filtrar movimientos</label>
                            <select className="form-select" id="slcFiltrar" defaultValue={'DEFAULT'} ref={slcFiltrado} onChange={limpiarCampos}>
                                <option value="DEFAULT" disabled>Seleccione una opción</option>
                                <option value="todos">Todos los movimientos</option>
                                <option value="gasto">Gastos</option>
                                <option value="ingreso">Ingresos</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-2 text-center">
                            <button type="submit" className="btn btn-form text-uppercase" onClick={filtrado}>Filtrar</button>
                        </div>
                    </div>
                    {eliminado && <div className=" text-center text-success fw-semibold">
                        <p>Movimiento eliminado correctamente</p>
                    </div>}
                    {vacioMov && <div className=" text-center fw-semibold">
                        <p>No existen movimientos</p>
                    </div>}
                    <div className="col-11 col-lg-10 div-listado m-auto">
                        <table className="table mt-5">
                            <thead>
                                <tr>
                                    <th className="p-3">Tipo</th>
                                    <th className="p-3">Concepto</th>
                                    <th className="p-3">Rubro</th>
                                    <th className="p-3">Medio</th>
                                    <th className="p-3">Total</th>
                                    <th className="p-3">Fecha</th>
                                    <th className="p-3">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movimientosFiltrados.map(mov => (
                                    <tr key={mov.id}>
                                        {mov.categoria === 1 || mov.categoria === 2 || mov.categoria === 3 || mov.categoria === 4 || mov.categoria === 5 || mov.categoria === 6 ? <td className="p-3 fw-semibold" >Gasto</td> : <td className="p-3 fw-semibold" >Ingreso</td>}
                                        <td className="p-3">{mov.concepto}</td>
                                        {rubroTodo.map(e => (
                                            (e.id === mov.categoria) ? <td className="p-3" key={e.id}>{e.nombre}</td> : null
                                        ))}
                                        <td className="p-3">{mov.medio}</td>
                                        <td className="p-3">$ {mov.total}</td>
                                        <td className="p-3">{mov.fecha}</td>
                                        <td className="text-decoration-underline p-3" >

                                            <Link className='quitar-lista text-danger' onClick={() => {

                                                if (window.confirm(`¿Desea eliminar ${mov.concepto}?`)) {
                                                    let objEliminarMov = {
                                                        "idMovimiento": mov.id
                                                    }

                                                    fetch('https://dwallet.develotion.com/movimientos.php', {
                                                        method: 'DELETE',
                                                        body: JSON.stringify(objEliminarMov),
                                                        headers: {
                                                            "apikey": apiKey,
                                                            'Content-type': 'application/json; charset=UTF-8'
                                                        },
                                                    })
                                                        .then(respuesta => respuesta.json())
                                                        .then((datos) => {
                                                            if (datos.codigo === 200) {
                                                                console.log(datos.mensaje);
                                                                setEliminado(true)
                                                            } else {
                                                                console.log(datos.mensaje)
                                                            }

                                                        });
                                                }
                                            }}>Quitar de la lista</Link >
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ListaMov