import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from './../../store/goodsSlice';
import { fetchDeleteGood } from './../../store/goodsSlice';

import { Grid, Typography } from '@mui/material';

import Good from './../Good';

const Goods = () => {
    const dispatch = useDispatch();
    const { goods, filteredGoods, searchValue, isLoading, error } = useSelector(state => state.goods);
    const [isDisabledRemoveBtn, setIsDisabledRemoveBtn] = useState(false);

    useEffect(() => {
        if(!goods) {
            dispatch(fetchGoods());
        }
    }, [dispatch])

    const handleRemoveGood = (id) => {
        setIsDisabledRemoveBtn(id);
        dispatch(fetchDeleteGood(id))
    }

    const goodsList = (goods) => {
        return goods && goods.products.map(product => {
            return <Grid key={product.id} item xs={3}>
                <Good {...product}
                    onRemove={() => handleRemoveGood(product.id)}
                    isDisabled={isDisabledRemoveBtn === product.id && true}
                />
            </Grid>
        })
    }

    if (error) {
        return <Typography>Error...</Typography>
    }

    return (!isLoading ?
        <Grid container spacing={3} >
            {filteredGoods.products.length >= 0 && searchValue ?
                filteredGoods.products.length > 0 ?
                    goodsList(filteredGoods) 
                    :
                    <Grid xs={12} item >Ничего не найдено</Grid>
                :
                goodsList(goods)
            }
        </Grid>
        :
        <Typography>Loading...</Typography>


    )
}

export default Goods;