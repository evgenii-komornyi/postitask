import React from 'react';
import Container from '@material-ui/core/Container';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import Main from './components/main.component';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: { default: '#222' },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container>
                <Main />
            </Container>
        </ThemeProvider>
    );
};

export default App;
