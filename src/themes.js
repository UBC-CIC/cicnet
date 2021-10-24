import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#002145", 
        },
        secondary: {
            main: "#0680a6", // UBC blue
        },
        greyBlue: {
            main: "#c3d0db", // grey blue
        },
        darkTheme: {
            main: "#282c34",
            card: "#4a4f59",
        }
    },
});

export default theme;