//Hooks
import React, { useState, useEffect } from 'react';
//Librerias
import axios from 'axios';
import Swal from 'sweetalert2'

//Componentes
import Navbar from '../../components/Navbar'
import Sidebar from '../Sidebar/Sidebar';
import VentasHoy from './Components/VentasHoy';
import VentasTotal from './Components/VentasTotal';
import DetalleFactura from './Components/DetalleFactura';

const Ingresos = () => {
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
    const [listaDetalles, setListaDetalles] = useState([]);
    const [objDetalle, setObjDetalle] = useState({
        nfac: 0,
        fecha: "",
        Credito: "",
        vendedor: "",
        ncliente: "",
        nruc: "",
        telefono: "",
        Direccion: ""
    })

    const fillDatosDetalle = (nf, fec, cred, nven, aven, nc, nr, tel, dir, iva, tot) => {
        setObjDetalle(
            {
            ...objDetalle,
            nfac: nf,
            fecha: fec,
            Credito: cred,
            vendedor: `${nven} ${aven}`,
            ncliente: nc,
            nruc: nr,
            telefono: tel,
            Direccion: dir,
            iva: iva,
            total: tot
        })
    }

    const feedBack = () => {
        Swal.fire({
            icon: 'success',
            title: `Datos Cargados`,
            text: 'Ahora puedes ver a detalle los datos de esta venta. Ve a la pestaña "Detalle de Venta"'
          }) 
    }

    return (
        <div className="Principal w-100 min-vh-100">
            <Navbar />

            <Sidebar mOpen={mOpen} abreCierraMenu={abreCierraMenu} />

            <div className={`contenido ${!mOpen && "desplegado"}`}>
                <h2 className="pb-2 border-bottom border-dark">Reportes</h2>

                <div className="card mt-4 mx-auto text-center">

                    <div className="card-header p-3 d-flex justify-content-between">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="v-actual-tab" data-bs-toggle="tab" data-bs-target="#v-actual"
                                    type="button" role="tab" aria-controls="factura" aria-selected="true">Ventas de hoy</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="v-total-tab" data-bs-toggle="tab" data-bs-target="#v-total"
                                    type="button" role="tab" aria-controls="cliente" aria-selected="false">Ventas Totales</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="v-detalle-tab-" data-bs-toggle="tab" data-bs-target="#v-detalle"
                                    type="button" role="tab" aria-controls="cliente" aria-selected="false">Detalle de venta</button>
                            </li>
                        </ul>

                        {/* <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddEU">
                            Agregar Nuevo
                        </button>

                        <h5>{totalReg}</h5> */}
                    </div>

                    <div className="tab-content card-body">

                        <div className="tab-pane fade show active" id="v-actual" role="tabpanel" aria-labelledby="v-actual-tab"> <VentasHoy feedBack={feedBack} setListaDetalles={setListaDetalles} fillDatosDetalle={fillDatosDetalle}/> </div>
                        <div className="tab-pane fade" id="v-total" role="tabpanel" aria-labelledby="v-total-tab"><VentasTotal feedBack={feedBack} setListaDetalles={setListaDetalles} fillDatosDetalle={fillDatosDetalle}/></div>
                        <div className="tab-pane fade" id="v-detalle" role="tabpanel" aria-labelledby="v-detalle-tab"><DetalleFactura objDetalle={objDetalle} listaDetalles={listaDetalles}/> </div>

                    </div>

                    <div className="card-footer text-muted"> 

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Ingresos
