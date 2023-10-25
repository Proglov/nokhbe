'use client'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#090072',
        },
        secondary: {
            main: '#7d7d7d',
        }
    },
    typography: {
        fontFamily: "Shabnam"
    },
    components: {
        MuiMenu: {
            styleOverrides: {
                list: {
                    '&[role="menu"]': {
                        backgroundColor: '#688bff'
                    },
                },
            },
        },
    },
});

const CustomTheme = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}

export default CustomTheme;
