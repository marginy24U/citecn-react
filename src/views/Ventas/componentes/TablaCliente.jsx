import React, { useState, useEffect, Fragment } from 'react'
//librerias
import axios from 'axios'
import MaterialTable from 'material-table'
import { TableHead, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import Swal from 'sweetalert2'

const TablaCliente = ({ listaClUpdated, setlistaClUpdated, factura, setFactura }) => {
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
    const [listaClientes, setListaClientes] = useState([])
    //cargando clientes
    useEffect(() => {
        const getClientes = async () => {
            // setLoading(true);
            try {
                const { data } = await axios.get(`https://regxipruebas.cloud/API/clientes/all`);
                // const { data } = await axios.get(`http://localhost:3050/api/clientes/all`);
                setListaClientes(data.rows);

            } catch (error) {
                // setLoading(false);
                console.log(error);
                throw error
            }
        }

        getClientes();
        setlistaClUpdated(false)
    }, [listaClUpdated]);
    //---------------------------------------------
    const seleccionCliente = (idc, nc, ruc) => {
        setFactura({
            ...factura,
            id_cliente: idc,
            nombre_cliente: nc,
            nruc: ruc
        });
    }

    //--- Definimos las columnas que tendrá nuestra tabla. Las 2 primeras contienenlos botones de accion
    const columnas = [
        {
            title: "Edit",
            cellStyle: {
                borderLeft: 'solid #212529 1px',
                borderRight: 'solid #212529 1px'
            },
            render: rowData => <button 
            onClick={() => {
                seleccionCliente(rowData.id_cliente, rowData.nombre, rowData.ruc)
            }}
                className="btn btn-success" data-bs-dismiss="modal">
                <i class="fas fa-check-square"></i>
            </button>
        },
        { title: "Nombre", field: "nombre", cellStyle: { borderRight: "solid #6c757d 1px" } },
        { title: "RUC", field: "ruc", cellStyle: { borderRight: "solid #6c757d 1px" } },
    ]
    return (
        <Fragment >
           
            <MaterialTable
                columns={
                    columnas
                }
                data={listaClientes}
                title=""
                options={{
                    headerStyle: {
                        backgroundColor: '#212529',
                        border: '#212529',
    
                    }
                }}
    
                components={{
                    Header: props => {
                        return (
                            <TableHead className="">
                                <TableRow className="bg-dark border border-dark">
                                    <TableCell className={styles.titulos, "border-start-dark border-secondary text-white w-25"} align="center">Seleccionar</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"}>Nombre</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">RUC</TableCell>
                                </TableRow>
                            </TableHead>
                        )
                    }
                }}
    
                localization={{
                    toolbar: {
                        searchTooltip: 'Búsqueda',
                        searchPlaceholder: 'Buscar Cliente'
                    },
                    body: {
                        emptyDataSourceMessage: "No hay registros",
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

export default TablaCliente
