import { useEffect, useState } from 'react';
import { fetchAddGood, fetchChangeGood } from './../../store/goodsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useLocation, useParams } from 'react-router-dom';
import { TextField, Container, Box, Button } from '@mui/material';

const properties = ['title', 'description', 'price', 'thumbnail'];

const Form = () => {
    const { id } = useParams();
    const { pathname } = useLocation();

    const { goods, isLoading } = useSelector(state => state.goods);
    const dispatch = useDispatch();

    const [value, setValue] = useState({
        title: '',
        description: '',
        price: 0,
        thumbnail: ''
    });

    useEffect(() => {
        if (pathname !== '/addition') {
            setValue(goods.products.find(good => good.id == id));
        }
    }, [])

    const handleOnChagne = (event) => {
        const target = event.target;
        const name = target.name;

        setValue({
            ...value,
            [name]: target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (+value.price > 0 && pathname === '/addition') {
            dispatch(fetchAddGood(value));
            setValue(clearValue(value))
        } else {
            dispatch(fetchChangeGood(value))
        }
    }

    const clearValue = (value) => {
        return Object.fromEntries(
            Object.entries(value).map(([key, value]) => {
                if (key === 'price') return [key, value = 0]
                return [key, value = '']
            })
        )
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                mt: 5
            }}
        >
            <form
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
                onSubmit={handleSubmit}
            >

                {properties.map(prop => {
                    return <TextField
                        key={prop}
                        required
                        onChange={handleOnChagne}
                        value={value[prop]}
                        name={prop}
                        sx={{ mb: 3 }}
                        id="outlined-basic"
                        label={prop}
                        variant="outlined"
                        multiline
                    />
                })}

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        disabled={isLoading}
                    >
                        {pathname === '/addition' ? 'Add Product' : 'Change'}
                    </Button>

                    <Button
                        sx={{ p: 0 }}
                        variant="contained"
                        color="error"
                    >
                        <Link
                            to="/"
                            style={{ padding: '6px 16px', color: 'inherit', textDecoration: 'none' }}
                        >
                            Back
                        </Link>
                    </Button>
                </Box>
            </form>
        </Container>
    )
}

export default Form;