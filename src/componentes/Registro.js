import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Registro = () => {

    const slcIdDepartamento = useRef(null);
    const slcIdCiudad = useRef(null);
    const campoUsuario = useRef(null);
    const campoContrasenha = useRef(null);

    const [departamento, setDepartamento] = useState([]);
    const [ciudad, setCiudad] = useState([]);
    const [error, setError] = useState(false);
    const [msjErrorPass, setMsjErrorPass] = useState("")
    const [msjError, setMsjError] = useState("")
    const [desahabilitar, setDesahabilitar] = useState(true);



    let navigate = useNavigate();

    useEffect(() => {
        fetch("https://dwallet.develotion.com/departamentos.php")
            .then(r => r.json())
            .then(datosD => {
                setDepartamento(datosD.departamentos);
            });
    }, [])

    const cambioDepartamento = () => {

        fetch(`https://dwallet.develotion.com/ciudades.php?idDepartamento=${slcIdDepartamento.current.value}`)
            .then(r => r.json())
            .then(datosC => {
                setCiudad(datosC.ciudades);
            });
    }

    const registrarse = () => {

        let objUsuario = {
            "usuario": campoUsuario.current.value,
            "password": campoContrasenha.current.value,
            "idDepartamento": slcIdDepartamento.current.value,
            "idCiudad": slcIdCiudad.current.value
        }

        if (campoUsuario.current.value === " " || campoContrasenha.current.value === " ") {
            setError(true)
        }
        else if (campoContrasenha.current.value.length < 6) {
            setMsjErrorPass(true);
        }
        else {
            fetch('https://dwallet.develotion.com/usuarios.php', {
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
            && slcIdDepartamento.current.value !== "DEFAULT"
            && slcIdCiudad.current.value !== "DEFAULT"
        ) {
            setDesahabilitar(false);
        }
    }

    return (
        <section className="row justify-content-center registrarse">
            <h1 className='text-uppercase text-center mt-5'>Gestión de
                gastos y finanzas personales</h1>
            <h2 className='text-center text-uppercase py-5'>Registrarse</h2>
            <div className='row gap-5 justify-content-center'>
                <div className="col-md-5 mb-1 px-3">
                    <label htmlFor="txtNomUsuario" className="form-label">Nombre de Usuario</label>
                    <input type="text" className="form-control" id="txtNomUsuario" ref={campoUsuario} onChange={activarBtn} />
                </div>
                <div className="col-md-5 mb-1 px-3">
                    <label htmlFor="txtPassword" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="txtPassword" ref={campoContrasenha} onChange={activarBtn} />
                    {msjErrorPass &&<p className='p-pass p-1 text-info'>La contraseña debe contener como mínimo 6 caracteres</p>}
                </div>
                <div className="col-md-5 mb-1 px-3">
                    <label className="form-label" htmlFor='slcDepartamento'>Departamento</label>
                    <select className="form-select" id="slcDepartamento" ref={slcIdDepartamento} onChange={cambioDepartamento} defaultValue={'DEFAULT'}>
                        <option value="DEFAULT"  disabled>Seleccione un departamento</option>
                        {departamento.map(elemento => (
                            <option key={elemento.id} value={elemento.id} >{elemento.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-5 mb-1 px-3">
                    <label className="form-label" htmlFor='slcCiudad'>Ciudad</label>
                    <select className="form-select" id="slcCiudad" ref={slcIdCiudad} defaultValue={'DEFAULT'}>
                        <option value="DEFAULT"  disabled>Seleccione una ciudad</option>
                        {ciudad.map(elemento => (
                            <option key={elemento.id} value={elemento.id} >{elemento.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className='col-12 text-center mt-4'>
                    <button disabled={desahabilitar} type="submit" className="text-uppercase btn btn-light " onClick={registrarse}>Registrarse</button>
                </div>
                {(error) ? <div className="text-center text-danger fw-semibold">Ningún campo puede estar vacío</div> :  <div className="text-center text-danger fw-semibold">{msjError}</div>}
            </div>
            <p className='text-center pt-4'>
                Si ya te encuentas registrado haz <Link className="fw-semibold" to="/login">click acá</Link> || <Link className="fw-semibold" to="/">Volver al inicio</Link>
            </p>
        </section>
    )
}

export default Registro