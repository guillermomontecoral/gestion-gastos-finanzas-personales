import { Outlet, Link } from 'react-router-dom'



const PantallaPrincipal = () => {
    return (
        <header className="row justify-content-center">
            <h1 className='col-auto text-center text-uppercase mt-5'>Gestión de
                gastos y finanzas personales</h1>
            <p className='fw-light text-center'>Para ver sus datos inicie sesión o registrese en la app</p>
            <div className='col-12 col-md-3 text-center mt-3'>
                <Link className="btn btn-iniciar-sesion text-uppercase p-3" to="/login">Iniciar sesion</Link>
            </div>
            <div className='col-12 col-md-3 text-center  mt-3'>
                <Link className="btn btn-registrarse text-uppercase p-3" to="/registro">Registrarse</Link>
            </div>
            <p className="fw-semibold text-center pt-4 fs-5">¿Estás logueado? Haz click acá | <Link  to="/dashboard">Ir al DASHBOARD</Link>
            </p>
            <Outlet />
        </header>
    )
}

export default PantallaPrincipal