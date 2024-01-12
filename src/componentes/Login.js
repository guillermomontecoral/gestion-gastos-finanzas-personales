import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react';

const Login = () => {

    const campoUsuario = useRef(null);
    const campoContrasenha = useRef(null);

    const [error, setError] = useState(false);
    const [msjError, setMsjError] = useState("")
    const [desahabilitar, setDesahabilitar] = useState(true);


    let navigate = useNavigate();

    const iniciarSesion = () => {

        let objUsuario = {
            "usuario": campoUsuario.current.value,
            "password": campoContrasenha.current.value
        }

        if (campoUsuario.current.value === " " || campoContrasenha.current.value === " ") {
            setError(true);
        }
        else {
            fetch('https://dwallet.develotion.com/login.php', {
                method: 'POST',
                body: JSON.stringify(objUsuario),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            })
                .then(respuesta => respuesta.json()
                )
                .then((datos) => {
                    console.log(datos.mensaje);
                    if (datos.codigo === 200) {
                        localStorage.setItem("apiKeyUsuario", datos.apiKey);
                        localStorage.setItem("idUsuario", datos.id);
                        localStorage.setItem("nombreUsuario", campoUsuario.current.value);
                        navigate("/dashboard")
                    }
                    else {
                        setMsjError(datos.mensaje);
                    }

                });
        }
    }

    const activarBtn = e => {
        if (
            campoUsuario.current.value !== ""
            && campoContrasenha.current.value !== ""
        ) {
            setDesahabilitar(false);
        }
    }

    return (
        < section className="row iniciar-sesion justify-content-center" >
            <h1 className='text-uppercase text-center mt-5'>Gestión de
                gastos y finanzas personales</h1>
            <h2 className='text-center text-uppercase py-5'>Iniciar Sesión</h2>
            <div className='row gap-5 justify-content-center'>
                <div className="col-md-5">
                    <label htmlFor="txtNomUsuario" className="form-label">Nombre de Usuario</label>
                    <input type="text" className="form-control" id="txtNomUsuario" ref={campoUsuario} onChange={activarBtn} />
                </div>
                <div className="col-md-5">
                    <label htmlFor="txtPassword" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="txtPassword" ref={campoContrasenha} onChange={activarBtn} />
                </div>

                <div className='col-12 text-center'>
                    <button disabled={desahabilitar} type="submit" className="text-uppercase btn btn-light " onClick={iniciarSesion}>Ingresar</button>
                </div>
                {(error) ? <div className="text-center text-danger fw-semibold">El campo usuario y/o contraseña no pueden estar vacíos</div> : <div className="text-center text-danger fw-semibold">{msjError}</div>}
            </div>

            <p className='text-center pt-4'>
                Si aún no estás registrado haz <Link className="fw-semibold" to="/registro">click acá</Link> || <Link className="fw-semibold" to="/">Volver al inicio</Link>
            </p>
        </section >
    )
}

export default Login