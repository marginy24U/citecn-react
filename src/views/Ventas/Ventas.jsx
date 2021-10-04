import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
//Componentes
import Navbar from '../../components/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Factura from './componentes/Factura';
import Customers from './componentes/Customers';

const Ventas = () => {
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
    const [listaClUpdated, setlistaClUpdated] = useState(false)

    return (
        <div className="Principal w-100 min-vh-100">
            <Navbar />

            <Sidebar mOpen={mOpen} abreCierraMenu={abreCierraMenu} />

            <div className={`contenido ${!mOpen && "desplegado"}`}>
                <h2 className="pb-2 border-bottom border-dark">Ventas</h2>

                {/* Card */}
                <div className="card mt-4 mx-auto text-center">
                    <div className="card-header">
                        {/*----------- Pestañas de Navegacion --------------------*/}
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="factura-tab" data-bs-toggle="tab" data-bs-target="#factura"
                                    type="button" role="tab" aria-controls="factura" aria-selected="true">Factura</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="cliente-tab" data-bs-toggle="tab" data-bs-target="#cliente"
                                    type="button" role="tab" aria-controls="cliente" aria-selected="false">Cliente</button>
                            </li>
                        </ul>

                        {/*----------- Contenedor con cada uno de los componentes que se verán segun la pestaña activa --------------------*/}
                    </div>
                    <div className="tab-content card-body table-responsive">
                        <div className="tab-pane fade show active" id="factura" role="tabpanel" aria-labelledby="factura-tab"> <Factura listaClUpdated={listaClUpdated} setlistaClUpdated={setlistaClUpdated}/> </div>
                        <div className="tab-pane fade" id="cliente" role="tabpanel" aria-labelledby="cliente-tab"><Customers listaClUpdated={listaClUpdated} setlistaClUpdated={setlistaClUpdated} /></div>

                    </div>
                    <div className="card-footer text-muted">

                    </div>
                </div>
                {/* Fin Card */}
            </div>

        </div>
    );
};

export default Ventas;