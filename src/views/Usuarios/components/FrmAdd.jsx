import React from 'react'
import Swal from 'sweetalert2';

const FrmAdd = ({ usuarioAdd, setUsuarioAdd, guardarU }) => {

    const { nombre, apellido, nick, pass, cargo,
    permiso } = usuarioAdd;

    //Función para cambiar los valores del objeto usuario
    const handleChange = (e) => {
        setUsuarioAdd({
            ...usuarioAdd,
            [e.target.name]: e.target.value
        });
    }

    //Esta funcion valida los campos requeridos antes de enviar los datos
    const validaCampos = () => {
        if (nombre === "" || apellido === "" || nick === "" || pass === "" || permiso === "") {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Hay campos que son requeridos y debes llenar!'
            })
            return
        }
        else if (pass.length < 8 ) {
            Swal.fire({
                icon: 'error',
                title: 'Contraseña Débil',
                text: 'Tu contraseña debe tener al menos 8 caracteres'
            })
            return
        }
        else {
            guardarU()
            return
        }  
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); validaCampos(); e.target.reset(); }} className="row">
            <div className="mt-2 col-md-6">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" required value={nombre} name="nombre"  onChange={handleChange} />
            </div>
            <div className="mt-2 col-md-6">
                <label className="form-label">Apellido</label>
                <input type="text" className="form-control" required value={apellido} name="apellido"  onChange={handleChange} />
            </div>
            <div className="mt-2 col-md-6">
                <label className="form-label">User</label>
                <input type="text" className="form-control" required value={nick} name="nick"  onChange={handleChange} />
            </div>
            <div className="mt-2 col-md-6">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" required value={pass} name="pass"  onChange={handleChange} />
            </div>
            <div className="mt-2 col-md-6">
                <label className="form-label">Cargo</label>
                <input type="text" className="form-control" required value={cargo} name="cargo"  onChange={handleChange} />
            </div>
            <div className="mt-2 col-md-6">
                <label className="form-label">Permiso</label>
                <select onChange={handleChange} id="inputState" required name="permiso" className="form-select mx-2">
                    <option></option>
                    <option>VENTAS</option>
                    <option>ADMIN</option>
                </select>
            </div>

            <div className="mt-3 col-12 d-flex justify-content-center">
                <button className="btn btn-primary me-2" type="submit">Guardar</button>
                <button className="btn btn-secondary " type="button" data-bs-dismiss="modal">Cancelar</button>
            </div>
        </form>
    )
}

export default FrmAdd
