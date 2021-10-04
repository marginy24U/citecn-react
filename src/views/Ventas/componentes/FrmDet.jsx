import React, { useState, useEffect, Fragment } from 'react'
import Swal from 'sweetalert2';

const FrmDet = ({ idP, selectP, setSelectP, objDet, setObjDet, llenarDetalle, stock, precios, comisiones, ResetDet, factura, setFactura }) => {

    const { cantidad, pu, porcent } = objDet;

    const { comision1, comision2, comision3, comision4 } = comisiones;
    const { precio1, precio2, precio3, precio4 } = precios;

    const handleChange = (e) => {
        setObjDet({
            ...objDet,
            [e.target.name]: e.target.value
        })
    }
    //-----------------------------------------------    
    const selectProd = (e) => {
        e.preventDefault();
        e.target.reset()    
        ResetDet()
    }
             
    const enviaDet = (e) => {
        e.preventDefault();

        if (cantidad > stock) {
            Swal.fire({
                icon: 'error',
                title: 'Cantidad Inválida',
                text: `La cantidad no puede ser menor a las unidades existentes del producto`
            })
            return
        }
        else if (cantidad === 0 || pu === 0 || porcent === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Datos Incorrectos',
                text: `La cantidad, precio y comisión no pueden ser menores o iguales a cero`
            })
            return
        }
        else if (factura.id_producto.includes(idP)) {
            Swal.fire({
                icon: 'error',
                title: 'En Factura',
                text: `Ya has agregado este producto a la Factura`
            })
            return
        }
        else {
            llenarDetalle(objDet.iva, objDet.st);
            e.target.reset()
            ResetDet()
        }

    }

    return (
        <form onSubmit={selectP ? selectProd : enviaDet} className="col-md-6 col-lg-4 row g-3" novalidate>
            <div className="col-md-8">
                <label onClick={() => console.log(selectP)} className="form-label">Producto</label>
                <span className="d-flex">
                    <button onClick={() => setSelectP(true)} className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalProd" >
                        <i className="fas fa-plus-circle"></i>
                    </button>
                    <input className="form-control form-control-sm" type="text" value={objDet.producto} readOnly />
                </span>
            </div>

            <div className="col-md-4">
                <label className="form-label">Stock</label>
                <input className="form-control form-control-sm" type="number" min="0" value={stock} readOnly />
            </div>

            <div className="col-md-4">
                <label className="form-label">Cantidad</label>
                <input onChange={handleChange} className="form-control form-control-sm" name="cantidad" type="number" min="0" />
            </div>

            <div className="col-md-4">
                <label className="form-label">Precio</label>
                <select onChange={handleChange} name="pu" className="form-select form-select-sm">
                    <option>0</option>
                    <option>{precio1}</option>
                    <option>{precio2}</option>
                    <option>{precio3}</option>
                    <option>{precio4}</option>
                </select>
            </div>

            <div className="col-md-4">
                <label className="form-label">Comisión</label>
                {/* <input className="sm-box form-control form-control-sm" type="number" min="0" /> */}
                <select onChange={handleChange} name="porcent" className="form-select form-select-sm">
                    <option>0</option>
                    <option>{comision1}</option>
                    <option>{comision2}</option>
                    <option>{comision3}</option>
                    <option>{comision4}</option>
                </select>
            </div>

            <div className="col-md-4">
                <label className="form-label">Agregar</label>
                <button onClick={() => {
                    const siva = (pu * 0.15) * cantidad;
                    const subt = (pu * cantidad) + siva;
                    setObjDet({
                        ...objDet,
                        iva: siva.toFixed(2),
                        st: subt.toFixed(2)
                    });
                }} className="form-control btn btn-sm btn-success" data-bs-toggle="tooltip" data-bs-placement="right" title="Añadir a Factura"><i class="fas fa-cart-arrow-down"></i></button>
            </div>

            <div className="col-md-4">
                <label className="form-label">IVA</label>
                <input className="form-control form-control-sm" type="number" min="0" value={factura.iva} readOnly />
            </div>

            <div className="col-md-4">
                <label className="form-label">Total</label>
                <input className="form-control form-control-sm" type="number" min="0" value={factura.monto} readOnly />
            </div>
        </form>
       
    )
}

export default FrmDet
