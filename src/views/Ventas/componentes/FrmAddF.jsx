import React, { useState, useEffect, Fragment } from 'react'
//librerias
import axios from 'axios';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
// import '../css/main.css'

const FrmAddF = ({ setlistaPUpdated, setListDet, factura, setFactura }) => {

    const { id_usuario, id_cliente, monto, num_factura, fecha_venc } = factura;

    //referencias al usuario
    const cookies = new Cookies();
    const [vendedor, setVendedor] = useState("")
    const [ventaOk, setVentaOk] = useState(false)
    //Funciones
    //cargando usuario logueado (vendedor)
    useEffect(() => {
        const getUser = () => {
            setFactura({ ...factura, id_usuario: cookies.get('id') });
            const nuser = cookies.get('nombre');
            const auser = cookies.get('apellido');
            setVendedor(`${nuser} ${auser}`);
        }
        getUser();
        setVentaOk(false)
    }, [ventaOk]);

    //Restableciendo valores. Reset a factura
    const ResetFac = () => {
        setFactura({
            id_cliente: 0,
            monto: 0,
            credito: "NO",
            nruc: "",
            nombre_cliente: "",
            fecha_venc: "",
            iva: 0,
            num_factura: 0,
            anulada: false,
            tcambio: "X",
            id_producto: [],
            cantidad: [],
            precio: [],
            porcentaje: []
        })
    }

    //validacion antes de enviar datos
    const validaForm = (e) => {
        e.preventDefault();

        if (id_usuario === 0 || id_cliente === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Completa los campos del cliente',
                text: `Debes seleccionar un cliente de la lista presiona el boton verde al lado de la caja de texto`
            })
            return
        }
        else if (num_factura === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Campo Vacío',
                text: `Debes ingresar un numero de factura`
            })
            return
        }
        else if (fecha_venc === "") {
            Swal.fire({
                icon: 'error',
                title: 'Fecha Inválida',
                text: `Debes ingresar una fecha de vencimiento`
            })
            return
        }
        else if (monto === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Debes agregar productos a la factura',
                text: `Selecciona un producto a vender y especifica los detalles de venta de éste`
            })
            return
        }
        else {
            guardarF()
            e.target.reset()
            ResetFac()
            setListDet([])
            setVentaOk(true)
        }

    }

    // //----------- Registrar----------------------
    const guardarF = async () => {
        try {
            const { data } = await axios.post(`https://regxipruebas.cloud/API/ventas/`, factura);
            // const { data } = await axios.post(`http://localhost:3050/api/ventas/`, factura);
            if (data.status != 200) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                    text: 'Algo salio mal. Datos No Guardados',
                    showConfirmButton: true,
                })
            }
            else {
                // cargamos la lista de productos
                setlistaPUpdated(true)
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

    return (
        <form onSubmit={validaForm} className="m-auto col-md-6 row g-3 ">

            <div className="col-md-4">
                <label className="form-label">Num Factura</label>
                <input onChange={(e) => setFactura({ ...factura, num_factura: e.target.value })} className="form-control form-control-sm" type="number" min="0" />
            </div>

            <div className="col-md-4">
                <label className="form-label">Fecha vencimiento</label>
                <input onChange={(e) => setFactura({ ...factura, fecha_venc: e.target.value })} className="form-control form-control-sm" type="datetime-local" />
            </div>

            <div className="col-md-4">
                <label className="form-label">Vendedor</label>
                <input className="form-control form-control-sm" type="text" value={vendedor} readOnly />
            </div>

            <div className="col-md-6">
                <label className="form-label">Cliente</label>
                <span className="d-flex">
                    <label className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalCos">
                        <i className="fas fa-plus-circle"></i>
                    </label>
                    <input className="form-control form-control-sm"
                        data-bs-toggle="tooltip" data-bs-placement="right" title="Seleccionar Clientes" type="text"
                        value={factura.nombre_cliente} readOnly />
                </span>
            </div>

            <div className="col-md-6">
                <label className="form-label">RUC</label>
                <input className="text-center form-control form-control-sm" type="text" value={factura.nruc} readOnly />
            </div>

            <div className="col-md-4">
                <label className="form-label">Crédito</label>
                <select onChange={(e) => setFactura({ ...factura, credito: e.target.value })} className="form-select form-select-sm">
                    <option></option>
                    <option>SI</option>
                    <option>NO</option>
                </select>
            </div>

            <div className="col-md-6">
                {/* <label className="form-label"></label> */}
                <button className="mt-4 btn btn-sm btn-success form-control"> <i class="fas fa-save"></i> Guargar Factura</button>
            </div>
        </form>




    )
}

export default FrmAddF
