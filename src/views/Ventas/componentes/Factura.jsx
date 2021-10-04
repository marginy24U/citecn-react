import React, { useState, useEffect } from 'react'
//librerias
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
//componentes
import TablaCliente from './TablaCliente';
import TablaProductos from './TablaProductos';
import TablaVenta from './TablaVenta';
import FrmAddF from './FrmAddF';
import FrmDet from './FrmDet';

import Logo from '../imagenes/logoOriginal.png'
import '../css/main.css'


const Factura = ({listaClUpdated, setlistaClUpdated}) => {
    const cookies = new Cookies();
    const [factura, setFactura] = useState({
        id_usuario: 0,
        id_cliente: 0,
        monto: 0,
        credito: "NO",
        nruc: "N/A",
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
    });

    //Referencias al usuario
    const [idP, setIdP] = useState(0)
    const [nproducto, setNProducto] = useState("")
    const [stock, setStock] = useState(0)
    const [precios, setPrecios] = useState({
        precio1: 0,
        precio2: 0,
        precio3: 0,
        precio4: 0,
    })
    const [comisiones, setComisiones] = useState({
        comision1: 0,
        comision2: 0,
        comision3: 0,
        comision4: 0,
    })

    const [objDet, setObjDet] = useState({
        cantidad: 0,
        producto: "",
        pu: 0,
        porcent: 0,
        iva: 0,
        st: 0
    });

    const [listDet, setListDet] = useState([])
    //Referencia a la accion del formulario detalles
    const [selectP, setSelectP] = useState(false);
    const [listaPUpdated, setlistaPUpdated] = useState(false)


    //Se llama desde la tabla productos para llenar los datos de venta del producto
    const llenaTxt = (idp, desc, st, prec1, prec2,
        prec3, prec4, com1, com2, com3, com4) => {
        //primero volvemos la variable de seleccion a falso
        setSelectP(false);
        //-------------------
        setIdP(idp);
        setObjDet({...objDet, producto: desc});
        setStock(st);
        setPrecios({ ...precios, precio1: prec1, precio2: prec2, precio3: prec3, precio4: prec4 });
        setComisiones({ ...comisiones, comision1: com1, comision2: com2, comision3: com3, comision4: com4 })
    }

    //Funciones
    const llenarDetalle = (siva,subt) => {
        //referencia al usuario
        
        //lista de datos a enviar con factura
        setFactura({
            ...factura,
            cantidad: factura.cantidad.concat(objDet.cantidad),
            id_producto: factura.id_producto.concat(idP),
            precio: factura.precio.concat(objDet.pu),
            porcentaje: factura.porcentaje.concat(objDet.porcent),
            iva: factura.iva+parseFloat(siva),
            monto: factura.monto+parseFloat(subt)
        })
        setListDet(listDet.concat(objDet));
        
    }

    //RESTABLECIENDO VALORES
    const ResetDet = () => {
        setIdP(0)
        setStock(0)
        setNProducto("")
        setPrecios({
            ...precios,
            precio1: 0,
            precio2: 0,
            precio3: 0,
            precio4: 0
        })
        setComisiones({
            ...comisiones,
            comision1: 0,
            comision2: 0,
            comision3: 0,
            comision4: 0
        })
        setObjDet({
            ...objDet,
            cantidad: 0,
            producto: "",
            pu: 0,
            porcent: 0,
            iva: 0,
            st: 0
        })
    }

    //Para TEST
    const imprime = () => {
        console.log(`Datos de Factura
            usuario ${factura.id_usuario},
            num_facura ${factura.num_factura}
            id_cliente ${factura.id_cliente}
            nombre_cliente ${factura.nombre_cliente}
            RUC ${factura.nruc}
            Vencimiento ${factura.fecha_venc}
            Credito ${factura.credito}
            
            cantidades ${factura.cantidad}
            productos ${factura.id_producto}
            porcentajes ${factura.porcentaje}
            IVA ${factura.iva}
            Monto ${factura.monto}
            
            Detalles (objDet):
            ${objDet.cantidad}
            ${objDet.pu}
            ${objDet.porcent}
            ${objDet.iva}
            ${objDet.st}`);
    }

    return (
        <div className="movil-v p-4 border border-dark d-flex flex-sm-column flex-md-column">
            <header onClick={() => imprime()} className="d-flex">
                <img src={Logo} className="logo" alt="" />
            </header>

            <div className="row">
                <FrmDet idP={idP} selectP={selectP} setSelectP={setSelectP} objDet={objDet} setObjDet={setObjDet} llenarDetalle={llenarDetalle}
                    stock={stock} nproducto={nproducto} precios={precios} comisiones={comisiones} ResetDet={ResetDet} factura={factura} setFactura={setFactura} />
                
                <FrmAddF setlistaPUpdated={setlistaPUpdated} setListDet={setListDet} factura={factura} setFactura={setFactura} />

            </div>

            <TablaVenta factura={factura} listDet={listDet} setListDet={setListDet} />

            {/* ------ Modal que contiene la tabla Cliente ------ */}
            <div className="modal fade" id="modalCos" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Seleccionar Cliente</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <TablaCliente listaClUpdated={listaClUpdated} setlistaClUpdated={setlistaClUpdated} factura={factura} setFactura={setFactura} />
                        </div>
                        <div className="modal-footer">

                        </div>
                    </div>
                </div>
            </div>
            {/* Fin Modal  */}

            {/* ------ Modal que contiene la tabla Productos ------ */}
            <div className="modal fade" id="modalProd" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Seleccionar Producto</h5>

                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                            <TablaProductos listaPUpdated={listaPUpdated} setlistaPUpdated={setlistaPUpdated} llenaTxt={llenaTxt} />
                        </div>
                        <div className="modal-footer">

                        </div>
                    </div>
                </div>
            </div>
            {/* Fin Modal  */}
        </div>
    )
}

export default Factura
