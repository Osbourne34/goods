import { useDispatch, useSelector } from 'react-redux';
import { searchGoods } from './../../store/goodsSlice';

import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    const dispatch = useDispatch();
    const { searchValue, isLoading } = useSelector(state => state.goods);

    const handleSearch = (e) => {
        dispatch(searchGoods(e.target.value));
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end', flexGrow: 1 }}>
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
                sx={{ width: '30%' }}
                id="input-with-sx"
                label="Search"
                variant="standard"

                value={searchValue}
                onChange={handleSearch}
                disabled={isLoading}
            />
        </Box>
    )
}

export default Search;