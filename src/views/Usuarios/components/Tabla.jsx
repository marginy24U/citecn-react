import React, { Fragment } from 'react'
import MaterialTable from 'material-table'
import { TableHead, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import Swal from 'sweetalert2'
//estilos
import '../css/user.css'

const Tabla = ({ listaUsuarios, setUser, setIdUsuario, setPass, setPass2, deleteU, setIsEditar, formFill, loading }) => {
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
            title: "Edit",
            cellStyle: {
                borderLeft: 'solid #212529 1px'
            },
            render: rowData => <button onClick={() => {
                setIsEditar(true); setIdUsuario(rowData.id_usuario); formFill(rowData.nombre, rowData.apellido, rowData.nick, rowData.pass, 
                    rowData.cargo, rowData.permiso)                    
            }}
                className="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#modalAddEU">
                <i className="fas fa-edit"></i>
            </button>
        },
        
        {
            title: "Elim",
            
            render: rowData => <button onClick={() => { validaElim(rowData.id_usuario) }}
            className="btn btn-sm btn-danger">
                <i className="fas fa-minus-circle"></i>
            </button>
        },
        {
            title: "EditP",
            cellStyle: {
                borderRight: 'solid #6c757d 1px'
            },
            render: rowData => <button 
            onClick={() => {
                setPass("")
                setPass2("")
                setIdUsuario(rowData.id_usuario); 
                setUser(rowData.nick)                    
            }}
                className="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#modalEditP">
                <i class="fas fa-user-lock"></i>
            </button>
        },

        { title: "Nombre", field: "nombre", cellStyle: { borderRight: "solid #6c757d 1px" } }, 
        { title: "Apellido", field: "apellido", cellStyle: { borderRight: "solid #6c757d 1px" } }, 
        { title: "Usuario", field: "nick", cellStyle: { borderRight: "solid #6c757d 1px" } },
        { title: "Contraseña", field: "pass", cellStyle: { borderRight: "solid #6c757d 1px" } }, 
        { title: "Cargo", field: "cargo", cellStyle: { borderRight: "solid #6c757d 1px" } }, 
        { title: "Permiso", field: "permiso", cellStyle: { borderRight: "solid #6c757d 1px" } },
    ]

    //----------- OPERACIONES -------------------
    //----------- Validamos la accion Eliminar ----------------------
    const validaElim = (id) => {
        Swal.fire({
            title: '¿Estas Seguro?',
            text: "No podrás recuperar esta información",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {
            if (result.isConfirmed) {
                //Ejecutamos la función de eliminación
                deleteU(id);
            }
        })
    }
    return (
        <Fragment >
            {
            loading &&
                <div className="spinner-border text-info mx-auto" role="status">
                    <span className="visually-hidden mx-auto">Loading...</span>
                </div>
            }

            <MaterialTable
                columns={
                    columnas
                }
                data={listaUsuarios}
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
                                    <TableCell className={styles.titulos, "border-start-dark border-secondary text-white"} colSpan={3} align="center">Acciones</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"}>Nombre</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"}>Apellido</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} >Usuario</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Contraseña</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Cargo</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Permiso</TableCell>
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

export default Tabla
