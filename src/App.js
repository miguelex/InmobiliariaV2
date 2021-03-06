import React, { Component, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Snackbar } from "@material-ui/core";
import "./App.css";
import ListaInmuebles from "./componentes/vistas/ListaInmuebles";
import AppNavbar from "./componentes/layout/AppNavbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme/theme";
import RegistrarUsuario from "./componentes/seguridad/RegistrarUsuario";
import Login from "./componentes/seguridad/Login";
import { FirebaseContext } from "./server";

import { useStateValue } from "./sesion/store";
import openSnackbarReducer from "./sesion/reducers/openSnackbarReducer";
import RutaAutenticada from "./componentes/seguridad/RutaAutenticada";
import PerfilUsuario from "./componentes/seguridad/PerfilUsuario";
import NuevoInmueble from "./componentes/vistas/NuevoInmueble";
import EditarInmueble from "./componentes/vistas/EditarInmueble";
import LoginTelefono from "./componentes/seguridad/LoginTelefono";

import store from "./redux/store";
import { Provider } from "react-redux";
import ListaUsuarios from "./componentes/vistas/ListaUsuarios";
import { openMensajePantalla } from "./sesion/actions/snackbarAction";

function App(props) {
  let firebase = React.useContext(FirebaseContext);
  const [autenticacionIniciada, setupFirebaseInicial] = React.useState(false);

  const [{ openSnackbar }, dispatch] = useStateValue();

  useEffect(() => {
    firebase.estaIniciado().then((val) => {
      setupFirebaseInicial(val);
    });

    if (firebase.messagingValidation.isSupported()){
      firebase.messaging.onMessage((payload) => {
        openMensajePantalla(dispatch, {
          open: true,
          mensaje: payload.notification.title + ". " + payload.notification.body
        })
      })
    }
  });

  return autenticacionIniciada !== false ? (
    <Provider store={store}>
      <React.Fragment>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openSnackbar ? openSnackbar.open : false}
          autoHideDuration={3000}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={
            <span id="message-id">
              {openSnackbar ? openSnackbar.mensaje : ""}
            </span>
          }
          onClose={() =>
            dispatch({
              type: "OPEN_SNACKBAR",
              openMensaje: {
                open: false,
                mensaje: "",
              },
            })
          }
        ></Snackbar>
        <Router>
          <MuiThemeProvider theme={theme}>
            <AppNavbar />

            <Grid container>
              <Switch>
                <RutaAutenticada
                  exact
                  path="/"
                  autenticadoFirebase={firebase.auth.currentUser}
                  component={ListaInmuebles}
                />
                <RutaAutenticada
                  exact
                  path="/auth/perfil"
                  autenticadoFirebase={firebase.auth.currentUser}
                  component={PerfilUsuario}
                />
                <RutaAutenticada
                  exact
                  path="/inmueble/nuevo"
                  autenticadoFirebase={firebase.auth.currentUser}
                  component={NuevoInmueble}
                />
                <RutaAutenticada
                  exact
                  path="/inmueble/:id"
                  autenticadoFirebase={firebase.auth.currentUser}
                  component={EditarInmueble}
                />
                <RutaAutenticada
                  exact
                  path="/listaUsuarios"
                  autenticadoFirebase={firebase.auth.currentUser}
                  component={ListaUsuarios}
                />
                <Route
                  path="/auth/registrarUsuario"
                  exact
                  component={RegistrarUsuario}
                />
                <Route path="/auth/login" exact component={Login} />
                <Route
                  path="/auth/loginTelefono"
                  exact
                  component={LoginTelefono}
                />
              </Switch>
            </Grid>
          </MuiThemeProvider>
        </Router>
      </React.Fragment>
    </Provider>
  ) : null;
}

export default App;
