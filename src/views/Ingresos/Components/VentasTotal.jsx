import React, { Fragment, useState, useEffect } from 'react'
//librerias
import axios from 'axios'
import Swal from 'sweetalert2'
import MaterialTable from 'material-table'
import { TableHead, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"

const VentasTotal = ({feedBack, setListaDetalles, fillDatosDetalle}) => {
     //------------ ESTILOS -----------------
     const useStyles = makeStyles({ 
        "@global tbody tr:nth-child(odd)": {
            background: "#E4E9F7"
        },
        "@global tbody tr:nth-child(even)": {
            background: "white"
        },
        titulos: {
            borderRight: 'solid #212529 1px'
        }
    });
    //Inicializamos los estilos
    const styles = useStyles();
    //---------------------------------------

    //--- Definimos las columnas que tendrá nuestra tabla. Las 2 primeras contienenlos botones de accion
    const columnas = [
        {
            title: "Ver",
            cellStyle: {
                borderLeft: 'solid #6c757d 1px',
                borderRight: 'solid #6c757d 1px',
                width: '30px !important',
                textAlign: "center" 
            },
            export: false,
            render: rowData => <button 
            onClick={() => {
                const {num_factura, fecha, credito, iva, monto} = rowData;
                const {nombre, ruc, telefono, direccion} = rowData.Cliente;
                //Funciones
                feedBack();
                setListaDetalles(rowData.Factura_Detalle); fillDatosDetalle(num_factura, fecha, credito, rowData.Usuario.nombre, rowData.Usuario.apellido,
                    nombre, ruc, telefono, direccion, iva, monto);                    
            }}
                className="btn btn-sm btn-success" >
                <i class="fas fa-eye"></i>   
            </button>
        },
        
        { title: "N° Factura", field: "num_factura", cellStyle: { borderRight: "solid #6c757d 1px", textAlign: "center"} }, 
        { title: "Fecha", field: "fecha", cellStyle: { borderRight: "solid #6c757d 1px", textAlign: "center"} }, 
        { title: "Vendedor", field: "Usuario.nombre", cellStyle: { borderRight: "solid #6c757d 1px", textAlign: "center"} }, 
        { title: "Cliente", field: "Cliente.nombre", cellStyle: { borderRight: "solid #6c757d 1px", textAlign: "center"} },
        { title: "Credito", field: "credito", cellStyle: { borderRight: "solid #6c757d 1px", textAlign: "center"} }, 
        { title: "IVA", field: "iva", type: 'numeric', cellStyle: { borderRight: "solid #6c757d 1px", textAlign: "center"} }, 
        { title: "Monto Total", field: "monto", type: 'numeric', cellStyle: { borderRight: "solid #6c757d 1px", textAlign: "center"} }, 
        
    ]
    
    const [listVentasTotal, setListVentasTotal] = useState([])
    const [mensaje, setMensaje] = useState("")
    const [fecInicio, setFecInicio] = useState("")
    const [fecFin, setFecFin] = useState("")
    
    //Listando las ventas totales
    useEffect(()=>{
        const getVentasTotal = async () => {
            try {                
                const {data} = await axios.get(`https://regxipruebas.cloud/API/ventas/all`)
                // const {data} = await axios.get(`http://localhost:3050/api/ventas/all`)
                
                setListVentasTotal(data.rows);
                setMensaje(data.message)
            } catch (error) {
                console.log(error);
                throw error
            }
        }
        getVentasTotal();
    }, [])
    
    //Listando las ventas por rango de fecha
    
    const getVentasFecha = async (e) => {
        e.preventDefault();

        try {
            if (fecInicio === "" || fecFin === "") {
                Swal.fire({
                    icon: 'error',
                    title: `error`,
                    text: 'Debes llenar ambos campos de fecha'
                  }) 

                return
            }
            else{
                const {data} = await axios.get(`https://regxipruebas.cloud/API/${fecInicio}/${fecFin}`)
                // const {data} = await axios.get(`http://localhost:3050/api/ventas/${fecInicio}/${fecFin}`)
                if (data.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: `Datos cargados. ${data.rows.length} registros`,
                        showConfirmButton: false,
                        timer: 1500
                      })
                      setListVentasTotal(data.rows);
                      setMensaje(data.message);
                }
                else if(data.status === 404){
                    Swal.fire({
                        icon: 'warning',
                        title: `Ups!`,
                        text: `${data.message} entre ${fecInicio} y ${fecFin}`
                      })
                      
                      return
                }
                else{
                    
                    Swal.fire({
                        icon: 'error',
                        title: `${data.message}`,
                        text: `Algo salio mal. Vuelve a intentarlo mas tarde`
                      })
                }

            }

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    

    return (
        <Fragment>
            <div className="pb-3 row d-flex justify-content-between">
                <form onSubmit={getVentasFecha} className="pb-3 row col-md-6 d-flex justify-content-between">
                    <div className="col-md-5">
                        <label htmlFor="">Fecha Inicio</label>
                        <input onChange={(e)=>setFecInicio(e.target.value)} className="form-control form-control-sm" type="datetime-local"/>
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="">Fecha Fin</label>
                        <input onChange={(e)=>setFecFin(e.target.value)} className="form-control form-control-sm" type="datetime-local"/>
                    </div>
                    <button className="mt-4 w-50 m-auto btn btn-success">Buscar por fecha</button>
                </form>

                <h5 className="col-md-6 align-self-center float-end">{mensaje}</h5>
            </div>
            {/* {
            loading &&
                <div className="spinner-border text-info mx-auto" role="status">
                    <span className="visually-hidden mx-auto">Loading...</span>
                </div>
            } */}
            <MaterialTable
                columns={columnas}
                data={listVentasTotal}
                title=""
                options={{
                    headerStyle: {
                        textAlign: 'center',
                        border: 'solid #212529 1px',
                        
                    },
                    exportButton: true,
                    exportAllData: true,
                    exportFileName: 'TotalVentas'
                }}
                localization={{
                    
                    toolbar: {
                        searchTooltip: 'Busqueda',
                        searchPlaceholder: 'Busqueda'
                    },
                    body: {
                        emptyDataSourceMessage: "No hay registros",
                    },
                    pagination: {
                        labelRowsSelect: 'filas',
                        firstAriaLabel: 'Primer pag',
                        firstTooltip: 'Primer pag',
                        previousAriaLabel: 'Anterior',
                        previousTooltip: 'Anterior',
                        nextAriaLabel: 'Siguiente',
                        nextTooltip: 'Siguiente',
                        lastAriaLabel: 'última',
                        lastTooltip: 'última'
                    }
                }}
            />
        </Fragment>
    )
}

export default VentasTotal
