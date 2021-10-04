import React, { Fragment } from 'react'
// import { makeStyles } from "@material-ui/core/styles"
import Logo from '../imagenes/logoOriginal.png'
import '../css/main.css'

const DetalleFactura = ({ objDetalle, listaDetalles }) => {

    const {
        nfac,
        fecha,
        Credito,
        vendedor,
        ncliente,
        nruc,
        telefono,
        Direccion, 
        iva,
        total
    } = objDetalle;

    return (
        <div className="py-3 px-5">
            <header className="cabecera py-2 px-2 d-flex justify-content-between">
                <img className="h-75 " src={Logo} alt="" />
            </header>

            <div className="mb-3 me-2 row">
                <ul className="list-group col-md-6">
                    <li className="w-50 list-group-item border-0 border-bottom border-dark text-start"><span className="fw-bold">Datos de Factura </span> </li>
                    <li className="list-group-item border-0 text-start"><span className="fw-bold">N° Factura:</span> {nfac}</li>
                    <li className="list-group-item border-0 text-start"> <span className="fw-bold">Fecha:</span> {fecha}</li>
                    <li className="list-group-item border-0 text-start"> <span className="fw-bold">Crédito:</span> {Credito}</li>
                    <li className="list-group-item border-0 text-start"> <span className="fw-bold">Atendido por:</span> {vendedor}</li>
                </ul>

                <ul className="list-group col-md-6">
                    <li className="w-50 list-group-item border-0 border-bottom border-dark text-start"><span className="fw-bold">Datos del Cliente </span> </li>
                    <li className="list-group-item border-0 text-start"> <span className="fw-bold">Nombre:</span> {ncliente}</li>
                    <li className="list-group-item border-0 text-start"> <span className="fw-bold">RUC:</span> {nruc}</li>
                    <li className="list-group-item border-0 text-start"> <span className="fw-bold">Telefono:</span> {telefono}</li>
                    <li className="list-group-item border-0 text-start"> <span className="fw-bold">Dirección:</span> {Direccion}</li>
                </ul>

            </div>
            <div className="mt-5 table-responsive">
                <table className="table table-bordered table-stripped">
                    <thead>
                        <tr>
                            <th>Cantidad</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            {/* <th>IVA</th> */}
                            <th>Subtotal</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            listaDetalles.length !== 0
                                ?
                                listaDetalles.map((detalle, index) =>
                                    <tr key={index}>
                                        <td>{detalle.cantidad}</td>
                                        <td>{detalle.Producto.descripcion}</td>
                                        <td>{detalle.precio}</td>
                                        {/* <td>{(detalle.precio * 0.1)}</td> */}
                                        <td>{(detalle.precio * detalle.cantidad)}</td>
                                    </tr>

                                )
                                :
                                <tr>
                                    <td colSpan="5">No hay datos</td>
                                </tr>
                        }

                    </tbody>

                </table>
            </div>

            <div className="me-5 float-end">
                <div className="">
                    <h4 className="float-start">IVA: {iva}</h4> 
                </div>
                <div className="">
                    <h4 className="float-start">Total: {total}</h4> 
                </div>
            </div>
        </div>
    )
}

export default DetalleFactura
