import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import MaterialTable from 'material-table'
import { TableHead, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import '../css/main.css'

const TablaVenta = ({factura, listDet, setListDet}) => {
    const useStyles = makeStyles({
        "@global tbody tr:nth-child(odd)": {
            background: "#E4E9F7"
        },
        "@global tbody tr:nth-child(even)": {
            background: "white"
        },
        header: {
            backgroundColor: '#212529',
        },
        titulos: {
            color: '#fff',
            border: 'solid white 1px'
        },
        modalBtn: {
            columnGap: '20px'
        }
    });

    
    //Datatable - Datos a renderizar en la tabla (Material Table)
    const columnas = [
        // {
        //     title: "Quitar",
        //     render: rowData => <button
        //             className="btn btn-danger">
        //             <i className="fas fa-minus-circle"></i>
        //             </button>
        // },

        { title: "Cantidad", field: "cantidad", cellStyle: { textAlign:"center" }}, { title: "Producto", field: "producto", cellStyle: { textAlign:"center" }}, { title: "P/U", field: "pu", cellStyle: { textAlign:"center" }}, { title: "Porcentaje", field: "porcent", cellStyle: { textAlign:"center" } }, 
        { title: "IVA", field: "iva", cellStyle: { textAlign:"center" } }, { title: "Sub-total", field: "st", cellStyle: { textAlign:"center" } }
    ]
    //--------------------------------------------------------------
    //------------ Constantes de Estado ----------------------------
    // const [listDet, setListDet] = useState([]);

    // inicializamos los estilos
    const styles = useStyles();
    return (
        <Fragment >
           
            <MaterialTable
                columns={
                    columnas
                }
                data={listDet}
                title=""
                options={{
                    headerStyle: {
                        backgroundColor: '#212529',
                        border: '#212529',
                        color: '#fff'    
                    },
                    search: false,
                    exportButton: true,
                    exportAllData: true,
                    exportFileName: `Cliente: ${factura.nombre_cliente} | Fecha: ${new Date}`,
                    pageSize: 10,
                    pageSizeOptions: [10,15,20]
                }}
    
                // components={{
                //     Header: props => {
                //         return (
                //             <TableHead className="">
                //                 <TableRow className="bg-dark border border-dark">
                //                     {/* <TableCell className={styles.titulos, "border-start-dark border-secondary text-white"} align="center">Quitar</TableCell> */}
                //                     <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Cantidad</TableCell>
                //                     <TableCell className={styles.titulos, "border border-secondary text-white lg-box"} align="center">Producto</TableCell>
                //                     <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">P/U</TableCell>
                //                     <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Porcentaje</TableCell>
                //                     <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">IVA</TableCell>
                //                     <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Sub-Total</TableCell>
                //                 </TableRow>
                //             </TableHead>
                //         )
                //     }
                // }}
    
                localization={{
                    toolbar: {
                        searchTooltip: 'Búsqueda',
                        searchPlaceholder: 'Buscar Producto',
                        exportTitle: 'Exportar tabla',
                        exportAriaLabel: 'Exportar'
                    },
                    body: {
                        emptyDataSourceMessage: "No has agregado nada a la factura",
                    },
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
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

export default TablaVenta
