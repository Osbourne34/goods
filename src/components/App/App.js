import { Routes, Route, Link } from 'react-router-dom';

import { Container, Box, Button } from '@mui/material';

import { routes } from './../../route';

import Search from './../Search';
import Goods from './../Goods';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={
                <Container>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'end',
                            justifyContent: 'space-between',
                            mb: 4
                        }}
                    >
                        <Search />
                        <Button
                            sx={{ p: 0 }}
                            variant="contained"
                            color="success"
                        >
                            <Link
                                to="addition"
                                style={{ padding: '6px 16px', color: 'inherit', textDecoration: 'none' }}
                            >
                                Add product
                            </Link>
                        </Button>
                    </Box>
                    <Goods />
                </Container>}
            />
            {routes.map(({path, component}) => {
                return <Route key={path} path={path} element={component} />
            })}
        </Routes >
    );
}

export default App;
