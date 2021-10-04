import React, { useState, useEffect, Fragment } from 'react'
import MaterialTable from 'material-table'
import { TableHead, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
//librerias
import Swal from 'sweetalert2'
import axios from 'axios'

const TablaCat = ({libro, setLibro, nombreCat, setNombreCat}) => {
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
        },
        acciones: {
            width: '100px'
        },
        campos: {
            minWidth: '150px'
        }
    });
    //Inicializamos los estilos
    const styles = useStyles();
    //---------------------------------------
    //--- Definimos las columnas que tendrá nuestra tabla. Las 2 primeras contienenlos botones de accion
    const columnas = [
        {
            title: "Seleccionar",
            cellStyle: {
                borderLeft: 'solid #212529 1px',
                borderRight: "solid #6c757d 1px", 
            },
            render: rowData => <button 
            onClick={() => {
               AddCat(rowData.id_categoria, rowData.nombre);                    
            }}
                className="btn btn-success" data-bs-target="#modalAddEL" data-bs-toggle="modal" data-bs-dismiss="modal">
                <i className="fas fa-plus-circle"></i>
            </button>
        },

        { title: "Nombre", field: "nombre", cellStyle: { borderRight: "solid #6c757d 1px", maxWidth: "auto" } }, 
        { title: "Descripcion", field: "descripcion", cellStyle: { borderRight: "solid #6c757d 1px", maxWidth: "auto" } },
    ]

    //Rellenar Categoria
    const AddCat = (idc, nombre) => {
        setLibro({
            ...libro,
            id_categoria: idc
        })
        setNombreCat(nombre)
    }

    //-----CRUD
    const [listaCategorias, setListaCategorias] = useState([])

    useEffect(() => {
        const getCategorias = async () => {
            // setLoading(true);
            try {
                const { data } = await axios.get(`https://regxipruebas.cloud/API/categorias/all`);
                // const { data } = await axios.get(`http://localhost:3050/api/categorias/all`);
                setListaCategorias(data.rows);
                // setLoading(false);
                // setTotalReg(data.message)

            } catch (error) {
                // setLoading(false);
                console.log(error);
                throw error
            }
        }

        getCategorias();
        // setlistUpdated(false)
    }, []);

   
    return (
        <Fragment >
            
            <MaterialTable
                columns={
                    columnas
                }
                data={listaCategorias}
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
                                    <TableCell className={styles.titulos, styles.acciones, "border-start-dark border-secondary text-white w-25"} align="center">Seleccionar</TableCell>
                                    <TableCell className={styles.titulos, styles.campos, "border border-secondary text-white"}>Nombre</TableCell>
                                    <TableCell className={styles.titulos, styles.campos, "border border-secondary text-white"} align="center">Descripción</TableCell>
                                </TableRow>
                            </TableHead>
                        )
                    }
                }}
    
                localization={{
                    toolbar: {
                        searchTooltip: 'Búsqueda',
                        searchPlaceholder: 'Buscar Categoria'
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

export default TablaCat
