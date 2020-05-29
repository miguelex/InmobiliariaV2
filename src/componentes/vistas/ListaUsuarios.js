import React, {useState, useEffect} from 'react';
import {Container, Paper, Grid, Table, TableBody, TableRow, TableCell, Button} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { obtenerUsuariosApp } from '../../redux/actions/usuarioAction';
import { enviarCorreoElectronico } from '../../redux/actions/emailAction';
import { useStateValue } from '../../sesion/store';
import { openMensajePantalla } from '../../sesion/actions/snackbarAction';

const style = {
    paper : {
        marginTop : 8,
        display : "flex",
        flexDirection : "column",
        alignItem : "center",
        padding : "20px",
        background : "#f5f5f5"
    },
    container : {
        paddingTop : "8px"
    }
}

const ListaUsuarios = props => {

    const [{sesion}, dispatch] = useStateValue();

    const [isLoading, setIsLoading] = useState(false);

    const listaArreglo = useSelector(state => state.usuarioRedux.usuarios);

    const dispatchRedux = useDispatch();

    useEffect(() => {
        async function obtenerData() {
            await obtenerUsuariosApp(dispatchRedux);
        }

        if(!isLoading){
            setIsLoading(true);
            obtenerData();
        }
    })

    const enviarEmail = (email) => {

        const obj = {
            email: email,
            titulo : "Mensaje desde App React Extremo",
            mensaje : "Gracias por participar en el curso"
        }
        enviarCorreoElectronico(obj).then(dataServer => {
            console.log(dataServer);
            openMensajePantalla(dispatch, {
                open : true,
                mensaje : " Se envio el correo electronico al destinatario " + email
            })
        })
    }

    return (
        <Container style={style.container}>
            <Paper style={style.paper}>
                <Grid container justify="center">
                    <Grid item xs={12} sm={12}>
                        <Table>
                            <TableBody>
                                {
                                    listaArreglo 
                                    ? listaArreglo.map((row, i) => (
                                        <TableRow key={i}>
                                            <TableCell align="left">{row.email || row.telefono}</TableCell>
                                            <TableCell align="left">{row.nombre ? (row.nombre + ' ' + row.apellido) : 'No tiene nombre'}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="primary" size="small">Roles</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" onClick={() => enviarEmail(row.email)} color="primary" size="small">Enviar Mensaje</Button>
                                            </TableCell>
                                        </TableRow>
                                        )
                                    )
                                    : ""
                                }
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Paper>

        </Container>
    )

}

export default ListaUsuarios;