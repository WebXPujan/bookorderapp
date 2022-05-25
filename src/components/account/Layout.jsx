import { Container } from '@mui/material';

export { Layout };

function Layout({ children }) {

    

    return (
        <Container maxWidth="xl">
            {children}
        </Container>
    );
}