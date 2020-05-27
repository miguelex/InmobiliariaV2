import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCtewL0TV6HecOkLHbXGVFU_WkTQ2vqeCI",
    authDomain: "templatecurso-6d079.firebaseapp.com",
    databaseURL: "https://templatecurso-6d079.firebaseio.com",
    projectId: "templatecurso-6d079",
    storageBucket: "templatecurso-6d079.appspot.com",
    messagingSenderId: "389004831833",
    appId: "1:389004831833:web:a3d4fe4ab3ff0ee5699548",
    measurementId: "G-1MLJKJ3LEE"
  };

// const config = {
//     apiKey: "AIzaSyDk0Am6aHFhVRM_kJPy2N7-RBSrce8LhgA",
//     authDomain: "inmuebles-1df7e.firebaseapp.com",
//     databaseURL: "https://inmuebles-1df7e.firebaseio.com",
//     projectId: "inmuebles-1df7e",
//     storageBucket: "inmuebles-1df7e.appspot.com",
//     messagingSenderId: "665903911314",
//     appId: "1:665903911314:web:2fd8ebc654e52f75e7314b",
//     measurementId: "G-GTHBMM0M7L"
//   };




class Firebase{
    
    constructor(){
        app.initializeApp(config);
        this.db = app.firestore();
        this.auth = app.auth();
        this.storage = app.storage();
        this.authorization = app.auth;

        this.storage.ref().constructor.prototype.guardarDocumentos = function(documentos){
            var ref=this;
            return Promise.all(documentos.map(function(file){
                return ref.child(file.alias).put(file).then(snapshot =>{
                    return ref.child(file.alias).getDownloadURL();
                })
            }))
        }

    }

    estaIniciado() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    } 

    guardarDocumento = (nombreDocumento, documento) => this.storage.ref().child(nombreDocumento).put(documento);

    devolverDocumento = (documentoUrl) => this.storage.ref().child(documentoUrl).getDownloadURL();

    guardarDocumentos = (documentos) => this.storage.ref().guardarDocumentos(documentos);

    eliminarDocumento = documento => this.storage.ref().child(documento).delete();

}

export default Firebase;