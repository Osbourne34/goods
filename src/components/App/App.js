import {Routes, Route, Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {closeSnack} from './../../store/goodsSlice';

import {Container, Box, Button, Alert} from '@mui/material';

import {routes} from './../../route';

import Search from './../Search';
import Goods from './../Goods';
import Snack from './../Snack';

const App = () => {
    const dispatch = useDispatch();
    const {isRemoved, isAdded, isChanged} = useSelector(state => state.goods);

    return (
        <>
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
                            <Search/>
                            <Button
                                sx={{p: 0}}
                                variant="contained"
                                color="success"
                            >
                                <Link
                                    to="addition"
                                    style={{padding: '6px 16px', color: 'inherit', textDecoration: 'none'}}
                                >
                                    Add product
                                </Link>
                            </Button>
                        </Box>
                        <Goods/>
                    </Container>}
                />
                {routes.map(({path, component}) => {
                    return <Route key={path} path={path} element={component}/>
                })}
            </Routes>
            <Snack
                isOpen={isRemoved}
                handleClose={() => dispatch(closeSnack('isRemoved'))}
                children={
                    <Alert
                        severity="error"
                    >
                        Товар удален
                    </Alert>
                }
            />
            <Snack
                isOpen={isAdded}
                handleClose={() => dispatch(closeSnack('isAdded'))}
                children={
                    <Alert
                        severity="success"
                    >
                        Товар добавлен
                    </Alert>
                }
            />
            <Snack
                isOpen={isChanged}
                handleClose={() => dispatch(closeSnack('isChanged'))}
                children={
                    <Alert
                        severity="info"
                    >
                        Товар изменен
                    </Alert>
                }
            />
        </>
    );
}

export default App;
