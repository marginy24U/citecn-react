import React, { useState } from 'react'
import md5 from 'md5';
import Swal from 'sweetalert2';

const FrmPass = ({ pswd, setPass, pass2, setPass2, ActualizaPass }) => {

    

    const handlePassChange = (e) => {
        setPass(e.target.value)
    }
    const handlePassChange2 = (e) => {
        setPass2(e.target.value)
    }

    const ResetPsw = () => {
        setPass("")
        setPass2("")
    }

    const validaPass = (e) => {
        e.preventDefault();
        e.target.reset();

        if (pswd === "" || pass2 === "") {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Debes llenar ambos campos!'
            })

            return
        }
        else if (pswd != pass2) {
            Swal.fire({
                icon: 'error',
                title: 'No coinciden',
                text: 'No son iguales. Vuelve a intentarlo'
            })
            e.target.reset();
            return
        }
        else if (pswd.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Insegura',
                text: 'Tu contraseña debe tener al menos 8 caracteres'
            })
            return
        }
        else {
            ActualizaPass()
            e.target.reset();
            ResetPsw();
        }
    }

    return (
        <form onSubmit={validaPass} className="row">

            <div className="mt-2 col-md-6">
                <label className="form-label">Nuevo Password</label>
                <input onChange={handlePassChange} type="password" value={pswd} className="form-control" required />
            </div>
            <div className="mt-2 col-md-6">
                <label className="form-label">Verifica Password</label>
                <input onChange={handlePassChange2} type="password" value={pass2} className="form-control" required />
            </div>

            <div className="mt-3 col-12 d-flex justify-content-center">
                <button className="btn btn-primary me-2" type="submit" data-bs-dismiss="modal">Guardar</button>
                <button className="btn btn-secondary " type="button" data-bs-dismiss="modal">Cancelar</button>
            </div>
        </form>
    )
}

export default FrmPass
