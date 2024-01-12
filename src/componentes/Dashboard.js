import React from 'react'
import { useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { obtenerRubros } from "../features/rubrosSlice";
import { guardarMovimientos } from "../features/movimientosSlice";

const Dashboard = () => {

    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("apiKeyUsuario") === null) {
            navigate("/");
        }
    }, [])

    const cerrarSesion = () => {
        localStorage.clear();
    }

    let apiKey = localStorage.getItem("apiKeyUsuario");
    let idUsu = localStorage.getItem("idUsuario");

    //Obtener Rubros
    const dispatch = useDispatch();
    useEffect(() => {
        fetch("https://dwallet.develotion.com/rubros.php", {
            headers: {
                "apikey": apiKey,
                "Content-type": "application/json"
            }
        })
            .then(respuesta => respuesta.json()
            )
            .then(datos => {
                dispatch(obtenerRubros(datos));
            });
    }, [])

    //Obtener movimientos
    useEffect(() => {
        fetch(`https://dwallet.develotion.com/movimientos.php?idUsuario=${idUsu}`, {
            headers: {
                "apikey": apiKey,
                "Content-type": "application/json"
            }
        })
            .then(r => r.json())
            .then(datos => {
                dispatch(guardarMovimientos(datos));
            });
    }) //No utilizo el array de dependencias para cada vez que hay un nuevo movimiento se actualice

    return (
        <>
            <div className="row">
                <div className="d-flex flex-nowrap align-items-center justify-content-between bg-nav">
                    <i className="bi bi-pie-chart p-2  d-inline d-sm-none "></i>
                    <Link className="m-0 p-3 d-none d-sm-inline text-decoration-none text-uppercase" to="/dashboard">Dashboard</Link>
                    <p className="m-0 d-none d-md-block">GESTIÓN DE GASTOS Y FINANZAS PERSONALES</p>
                    
                    <Link className="d-inline d-md-none " to="/" onClick={cerrarSesion}><i className="bi bi-x-circle p-2 "></i></Link>
                    <Link className="log-out m-0 d-none d-md-inline btn btn-secondary" to="/" onClick={cerrarSesion}>Cerrar Sesión</Link>
                </div>
            </div>
            <div className="row flex-nowrap justify-content-center">
                <div className="col py-3">
                    <section>
                    <p className="text-center d-md-none">GESTIÓN DE GASTOS Y FINANZAS PERSONALES</p>
                        <ul className="nav mb-sm-auto mb-0 d-flex justify-content-evenly" id="menu">
                            <li className="my-4">
                                <NavLink to="./agregargasto" className="btn btn-nav ">
                                    <i className="bi bi-credit-card-2-front"></i>
                                    <span className="ms-1 d-none d-lg-inline">Agregar gasto</span>
                                </NavLink>
                            </li>
                            <li className="my-4">
                                <NavLink to="./agregaringreso" className="btn btn-nav">
                                    <i className="bi bi-cash-coin"></i>
                                    <span className="ms-1 d-none d-lg-inline">Agregar ingreso</span>
                                </NavLink>
                            </li>
                            <li className="my-4">
                                <NavLink to="./listadomovimientos" className="btn btn-nav">
                                    <i className="bi bi-card-list"></i>
                                    <span className="ms-1 d-none d-lg-inline">Listado de movimientos</span>
                                </NavLink>
                            </li>
                            <li className="my-4">
                                <NavLink to="./montostotales" className="btn btn-nav">
                                    <i className="bi bi-coin"></i>
                                    <span className="ms-1 d-none d-lg-inline">Montos totales</span>
                                </NavLink>
                            </li>
                            <li className="my-4">
                                <NavLink to="./analisis" className="btn btn-nav">
                                    <i className="bi bi-bar-chart-line"></i>
                                    <span className="ms-1 d-none d-lg-inline">Análisis</span>
                                </NavLink>
                            </li>
                        </ul>
                    </section>
                    <section className="pt-4">
                        <h2 className="text-center p-bienvenido fs-1 mt-3"><span className="fw-semibold text-uppercase">{localStorage.getItem("nombreUsuario")}</span></h2>
                        <Outlet/>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Dashboard