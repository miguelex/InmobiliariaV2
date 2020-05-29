import axios from 'axios';

export const obtenerUsuariosApp = (dispatch) => {
    return new Promise ( async  (resolve, eject) => {
        const dataRest = await axios.get('https://us-central1-templatecurso-6d079.cloudfunctions.net/usuariosLista/lista');

        dispatch ({
            type : "LISTA_USUARIOS",
            payload : dataRest.data.usuarios
        })

        resolve();
    })
}

export const actualizarRoles = (dispatch, usuario) => {
    return new Promise (async (resolve, eject) => {
        const dataRest = await axios.post('https://us-central1-templatecurso-6d079.cloudfunctions.net/usuariosMantenimiento', usuario);

        dispatch ({
            type : "ACTUALIZAR_ROLES",
            payload : dataRest.data
        })

        resolve();
    })
}