//Hooks
import React, { useState, useEffect } from 'react';
//Librerias
import axios from 'axios';
import Swal from 'sweetalert2'
import md5 from 'md5';

//Componentes
import Navbar from '../../components/Navbar'
import Sidebar from '../Sidebar/Sidebar';
import Tabla from './components/Tabla';
import FrmAdd from './components/FrmAdd';
import FrmActions from './components/FrmActions';
import FrmPass from './components/FrmPass';

const Usuarios = () => {
    // ---------- MENU ---------------
    const [mOpen, setmOpen] = useState(true);
    const abreCierraMenu = () => {
        if (mOpen) {
            setmOpen(false);
        }
        else {
            setmOpen(true);
        }
    }
    //-------------------------------
    const [loading, setLoading] = useState(false)//Referencia para spiner
    const [isEditar, setIsEditar] = useState(false)//referencia para tipo de accion de formulario
    const [totalReg, setTotalReg] = useState("");//referencia de datos cargados
    const [listaUsuarios, setListaUsuarios] = useState([]);//datos traidos
    const [listUpdated, setlistUpdated] = useState(false);//referencia para actualizar la lista de datos

    const [id_usuario, setIdUsuario] = useState(0);
    //datos de cambio de contraseña
    const [user, setUser] = useState("")
    const [pswd, setPass] = useState("")
    const [pass2, setPass2] = useState("")
    //-------------------------------
    //Usuario Nuevo
    const [usuarioAdd, setUsuarioAdd] = useState({
        nombre: "",
        apellido: "",
        nick: "",
        pass: "",
        cargo: "",
        permiso: ""
    })
    //Usuario Actualizar
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        nick: "",
        // pass: "",
        cargo: "",
        permiso: ""
    })


    //Funcion para rellenar campos del formulario
    const formFill = (name, ape, nic, pas, car, per) => {
        setUsuario({
            nombre: name, apellido: ape, nick: nic,
             cargo: car, permiso: per
        })
    }

    //Funcion para Resetear los valores del objeto usuario
    const ResetU = () => {
        setIdUsuario(0);
        setUsuarioAdd({
            nombre: "", apellido: "", nick: "",
            pass: "", cargo: "", permiso: ""
        })
    }

    //-----CRUD
    useEffect(() => {

        const getUsuarios = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://regxipruebas.cloud/API/usuarios/all`);
                // const { data } = await axios.get(`http://localhost:3050/api/usuarios/all`);
                setListaUsuarios(data.rows);
                setLoading(false);
                setTotalReg(data.message)

            } catch (error) {
                setLoading(false);
                console.log(error);
                throw error
            }
        }

        getUsuarios();
        setlistUpdated(false)
    }, [listUpdated]);

    // //----------- Registrar----------------------
    const guardarU = async () => {

        try {
            const nuevoUser = { nombre: usuarioAdd.nombre, apellido: usuarioAdd.apellido,
                nick: usuarioAdd.nick, pass: md5(usuarioAdd.pass), cargo: usuarioAdd.cargo, permiso: usuarioAdd.permiso };
            const { data } = await axios.post(`https://regxipruebas.cloud/API/usuarios/`, nuevoUser);
            // const {data} = await axios.post(`http://localhost:3050/api/usuarios/`, nuevoUser);
            if (data.status != 200) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                    text: 'Algo salio mal. Dato no guardado',
                    showConfirmButton: true,
                })
            }
            else {
                setlistUpdated(true)
                ResetU();
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (err) {
            console.error(err)
            return
        }
    }
    // Editar Info Usuario
    const ActualizaU = async () => {
        try {
            const { data } = await axios.put(`https://regxipruebas.cloud/API/usuarios/${id_usuario}`, usuario);
            // const { data } = await axios.put(`http://localhost:3050/api/usuarios/${id_usuario}`, usuario);
            if (data.status != 200) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                    text: 'Algo salio mal. La información no se actualizó',
                    showConfirmButton: true,
                })
                console.log(data);
                return
            }
            else {
                setlistUpdated(true)
                console.log(data);
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (err) {
            console.error(err)
            return
        }
    }
    // Editar Password Usuario
    const ActualizaPass = async () => {
        try {
            const passw = {pass: md5(pswd)}
            const { data } = await axios.put(`https://regxipruebas.cloud/API/usuarios/psd/${id_usuario}`, passw);
            // const { data } = await axios.put(`http://localhost:3050/api/usuarios/psd/${id_usuario}`, passw);
            if (data.status != 200) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                    text: 'Algo salio mal. La información no se actualizó',
                    showConfirmButton: true,
                })
                console.log(data);
                return
            }
            else {
                setlistUpdated(true)
                // console.log(data);
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (err) {
            console.error(err)
            return
        }
    }

    // ------------------------------------------
    //----------- Eliminar ----------------------
    const deleteU = async (id) => {
        try {
            const { data } = await axios.put(`https://regxipruebas.cloud/API/usuarios/del/${id}`);
            // const { data } = await axios.put(`http://localhost:3050/api/usuarios/del/${id}`);
            if (data.status != 200) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                    text: 'No se ha completado la acción. Probablemente este dato sea importante para otros procesos',
                    showConfirmButton: true,
                })
            }
            else {
                Swal.fire(
                    '¡Borrado!',
                    'El registro ha sido eliminado.',
                    'success'
                )
                setlistUpdated(true)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="Principal w-100 min-vh-100">
            <Navbar />

            <Sidebar mOpen={mOpen} abreCierraMenu={abreCierraMenu} />

            <div className={`contenido ${!mOpen && "desplegado"}`}>
                <h2 className="pb-2 border-bottom border-dark">Usuarios</h2>

                <div className="card mt-4 mx-auto text-center">

                    <div className="card-header p-3 d-flex justify-content-between">

                        <button onClick={() => { ResetU(); setIsEditar(false) }} type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddEU">
                            Agregar Nuevo
                        </button>

                        <h5>{totalReg}</h5>
                    </div>

                    <div className="card-body">
                        <Tabla listaUsuarios={listaUsuarios} setUser={setUser} setIdUsuario={setIdUsuario} setPass={setPass} setPass2={setPass2} deleteU={deleteU} setIsEditar={setIsEditar} formFill={formFill} loading={loading} />

                        {/* ------ Modal que contiene el formulario de edicion y agregacion ------ */}
                        <div className="modal fade" id="modalAddEU" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        {
                                            isEditar
                                                ?
                                                <h5 className="modal-title" id="exampleModalLabel">Actualizar Info Usuario</h5>
                                                :
                                                <h5 className="modal-title" id="exampleModalLabel">Agregar Usuario</h5>
                                        }
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <div className="modal-body">
                                        <p className="text-center">Todos los campos son obligatorios. Por favor rellene los campos con datos válidos. Tu contraseña debe tener al menos 8 caracteres</p>
                                        {
                                            isEditar
                                            ? 
                                            <FrmActions usuario={usuario} setUsuario={setUsuario} ActualizaU={ActualizaU} />
                                            
                                            :
                                            <FrmAdd usuarioAdd={usuarioAdd} setUsuarioAdd={setUsuarioAdd} guardarU={guardarU} />
                                        }
                                    </div>
                                    <div className="modal-footer">

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fin Modal  */}

                        {/* ------ Modal que contiene el formulario de cambio de contraseña ------ */}
                        <div className="modal fade" id="modalEditP" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">

                                        <h5 className="modal-title" id="exampleModalLabel">Cambiar Contraseña a {user}</h5>

                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <div className="modal-body">
                                        <p className="text-center">Ambos campos deben coincidir. Su contraseña debe tener al menos 8 caracteres</p>

                                        {/*----------- Formulario que ejecuta las Funcion de ActualizaPass --------------------*/}
                                        <FrmPass pswd={pswd} setPass={setPass} pass2={pass2} setPass2={setPass2} ActualizaPass={ActualizaPass} />
                                    </div>
                                    <div className="modal-footer">

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fin Modal  */}
                    </div>

                    <div className="card-footer text-muted">

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Usuarios;