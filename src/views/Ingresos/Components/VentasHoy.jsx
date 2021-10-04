import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table'
import { TableHead, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"

const VentasHoy = ({ feedBack, setListaDetalles, fillDatosDetalle }) => {
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
                maxWidth: '30px !important',
                textAlign: "center"
            },
            export: false,
            render: rowData => <button
                onClick={() => {
                    const { num_factura, fecha, credito, iva, monto } = rowData;
                    const { nombre, ruc, telefono, direccion } = rowData.Cliente;
                    //funciones
                    feedBack()
                    
                    setListaDetalles(rowData.Factura_Detalle); fillDatosDetalle(num_factura, fecha, credito, rowData.Usuario.nombre, rowData.Usuario.apellido,
                        nombre, ruc, telefono, direccion, iva, monto);
                }}
                className="btn btn-sm btn-success">
                <i class="far fa-eye"></i>
            </button>
        },

        { title: "N° Factura", field: "num_factura", type: 'numeric', cellStyle: { borderRight: "solid #6c757d 1px", textAlign: "center" } },
        { title: "Fecha", field: "fecha", cellStyle: { borderRight: "solid #6c757d 1px", textAlign: "center" } },
        { title: "Vendedor", field: "Usuario.nombre", cellStyle: { borderRight: "solid #6c757d 1px", textAlign: "center"} },
        { title: "Cliente", field: "Cliente.nombre", cellStyle: { borderRight: "solid #6c757d 1px", textAlign: "center" } },
        { title: "Credito", field: "credito", cellStyle: { borderRight: "solid #6c757d 1px", textAlign: "center" } },
        { title: "IVA", field: "iva", type: 'numeric', cellStyle: { borderRight: "solid #6c757d 1px", textAlign: "center" } },
        { title: "Monto Total", field: "monto", type: 'numeric', cellStyle: { borderRight: "solid #6c757d 1px", textAlign: "center" } },

    ]

    const [mensaje, setMensaje] = useState("")
    const [listVentasHoy, setListVentasHoy] = useState([])
    const [Total, setTotal] = useState(0)
    const [vcargada, setVCargada] = useState(false)
    
    //Listando las ventas del dia actual
    useEffect(() => {
        const getVentasHoy = async () => {
            try {
                const {data} = await axios.get(`https://regxipruebas.cloud/API/ventas/today`)
                // const { data } = await axios.get(`http://localhost:3050/api/ventas/today`)
                setListVentasHoy(data.rows);
                setMensaje(data.message)
                setVCargada(true)
            } catch (error) {
                console.log(error);
                throw error
            }
        }
        getVentasHoy();
    }, [])

    //Calculando total de ingresos
    useEffect(() => {
        const getIngresos = () => {
            let test = 0;
            if (listVentasHoy.length > 0) {
                listVentasHoy.map((ingreso)=> {
                    let numDecimal = Number.parseFloat(ingreso.monto);
                    // console.log(numDecimal);
                    // setTotal(Number.parseFloat(ingreso.monto)+Total)
                    test += numDecimal
                    console.log(test);
                })  
            }
            setTotal(test.toFixed(2));
        }
        getIngresos();
        setVCargada(false)
    }, [vcargada])

    return (
        <Fragment>
            <h5 onClick={()=> console.log(typeof(Total))} className="my-3 text-end">{mensaje}</h5>
            <MaterialTable
                columns={columnas}
                data={listVentasHoy}
                title={`Total de ingresos: ${Total}`}
                options={{
                    headerStyle: {
                        textAlign: 'center',
                        border: 'solid #212529 1px',
                    },
                    exportButton: true,
                    exportAllData: true,
                    exportFileName: 'VentasHoy'
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

export default VentasHoy
