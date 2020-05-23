import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography : {
        useNextVariants: true
    },
    // palette : {
    //     primary : {
    //         main : '#10A75F'
    //     },
    //     common:{
    //         white : 'white'
    //     },
    //     secondary:{
    //         main : '#e53935'
    //     }
    // },
     palette: {
        primary: {
          light: '#aed581',
          main: '#689F39',
          dark: '#33691e',
          contrastText: '#ECFAD8',
        }
    },

    // palette: {
    //     primary: {
    //       light: '#63a4ff',
    //       main: '#1976d2',
    //       dark: '#004ba0',
    //       contrastText: '#bbdefb',
    //     }
    // },

    spacing : 10
  
    

});

export default theme;
