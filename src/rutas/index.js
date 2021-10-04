import React, {useState, useEffect} from 'react';
//Hooks
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
// librerias
import Cookies from 'universal-cookie';

//Componentes | Vistas
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
import Clientes from '../views/Clientes/Clientes';
import Usuarios from '../views/Usuarios/Usuarios';
import Ventas from '../views/Ventas/Ventas';
import Categoria from '../views/Categoria/Categoria';
import Libro from '../views/Libro/Libro';
import Materiales from '../views/Materiales/Materiales';
import Proveedores from '../views/Proveedores/Proveedores';
import Ingresos from '../views/Ingresos/Ingresos';
import Four0Four from "../views/404/Four0Four";

const Routes = () => {
    const cookies = new Cookies();
    // const [usuario, setUsuario] = useState("");
    const [permiso, setPermiso] = useState("");

    useEffect(() => {
        const getUser = () => {
            // setUsuario(cookies.get("user"));
            setPermiso(cookies.get("permiso"));
        }
        getUser();
    }, [])

    return (
        <Router>          
            <Switch>
                <Route path="/" exact>
                    <Login />
                </Route>

                <Route path="/home">
                    <Home />
                </Route>
                
                <Route path="/clientes">
                    <Clientes />
                </Route>

                {
                    permiso === "ADMIN" &&
                    <Route path="/usuarios">
                        <Usuarios />
                    </Route>
                }
                
                
                <Route path="/ventas">
                    <Ventas />
                </Route>

                <Route path="/categorias">
                    <Categoria />
                </Route>
                
                <Route path="/libro">
                    <Libro />
                </Route>

                <Route path="/materiales">
                    <Materiales />
                </Route>
                
                <Route path="/proveedores">
                    <Proveedores />
                </Route>
                
                <Route path="/ingresos">
                    <Ingresos />
                </Route>
                
                <Route>
                    <Four0Four />
                </Route>
            </Switch>
        </Router>
    );
};

export default Routes;