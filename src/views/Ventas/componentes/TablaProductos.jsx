import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import MaterialTable from 'material-table'
import { TableContainer, Table, TableHead, TableRow, TableCell, Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"

const TablaProductos = ({listaPUpdated, setlistaPUpdated, llenaTxt}) => {
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

    // inicializamos los estilos
    const styles = useStyles();
    
    //Datatable - Datos a renderizar en la tabla (Material Table)
    const columnas = [
        {
            title: "Añadir",
            // field: "descripcion"
            
            render: rowData => <button 
            onClick={() => {
                    // limpiaForm();
                    llenaTxt(rowData.id_producto, rowData.descripcion, rowData.stock, rowData.precio1, rowData.precio2,
                                rowData.precio3, rowData.precio4, rowData.comision1, rowData.comision2, rowData.comision3, rowData.comision4)
                    }}
                    className="btn btn-success" data-bs-dismiss="modal">
                    <i className="fas fa-plus-circle"></i>
                    </button>
        },

        { title: "Descripcion", field: "descripcion"}, { title: "Marca", field: "marca"}, { title: "Modelo", field: "modelo" }, { title: "Stock", field: "stock"},       
        { title: "Precio1", field: "precio1", type:  'numeric' }, { title: "Precio2", field: "precio2", type:  'numeric'}, { title: "Precio3", field: "precio3", type:  'numeric'},
        { title: "Precio4", field: "precio4", type:  'numeric'}, { title: "Comision1", field: "comision1", type:  'numeric' }, { title: "Comision2", field: "comision2", type:  'numeric' },
        { title: "Comision3", field: "comision3", type: 'numeric'}, { title: "Comision4", field: "comision4", type:  'numeric'},
    ]

    const [listaProductos, setListaProductos] = useState([]);
    //cargando productos
    useEffect(() => {
        const getProductos = async () => {
            // setLoading(true);
            try {
                const { data } = await axios.get(`https://regxipruebas.cloud/API/productos/existance`);
                // const { data } = await axios.get(`http://localhost:3050/api/productos/existance`);
                setListaProductos(data.rows);
                // setLoading(false);
                // setTotalReg(data.message)

            } catch (error) {
                // setLoading(false);
                console.log(error);
                throw error
            }
        }

        getProductos();
        setlistaPUpdated(false)
    }, [listaPUpdated]);

    return (
        <Fragment>
           
            <MaterialTable
                columns={
                    columnas
                }
                data={listaProductos}
                title=""
                options={{
                    actionsColumnIndex: -1,
                    cellStyle: {                                                                                                                                              
                        border: 'solid black 1px',
                        
                      }
                }}
                
                components={{
                    Header: props => {
                        return (
                            <TableHead className="bg-dark">
                                <TableRow >
                                    <TableCell className={styles.titulos} align="center">Añadir</TableCell>
                                    <TableCell className={styles.titulos}>Descripción</TableCell>
                                    <TableCell className={styles.titulos}>Marca</TableCell>
                                    <TableCell className={styles.titulos} >Modelo</TableCell>
                                    <TableCell className={styles.titulos} align="center">Stock</TableCell>
                                    <TableCell className={styles.titulos} colSpan={4} align="center">Precio</TableCell>
                                    <TableCell className={styles.titulos} colSpan={4} align="center">Comisión</TableCell>
                                </TableRow>
                            </TableHead>
                        )
                    }
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

export default TablaProductos
