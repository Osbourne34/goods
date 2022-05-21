import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    goods: null,
    isLoading: false,
    error: null,
    searchValue: '',
    isRemoved: false,
    isAdded: false,
    isChanged: false,
    filteredGoods: {
        products: []
    }
}

const removeGoods = (goods, id) => {
    return goods.filter(good => good.id !== id);
}

export const fetchGoods = createAsyncThunk(
    'goods/fetchGoods',
    async () => {
        const response = await fetch('https://dummyjson.com/products?limit=10&skip=0');
        const data = await response.json();
        return data;
    }
)

export const fetchDeleteGood = createAsyncThunk(
    'goods/fetchDeleteGood',
    async (id) => {
        await fetch('https://dummyjson.com/products/' + id, {
            method: 'DELETE',
        });
        return id;
    }
)

export const fetchAddGood = createAsyncThunk(
    'goods/fetchAddGood',
    async (dataGood) => {
        const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataGood)
        })
        const good = await response.json();
        return good;
    }
)

export const fetchChangeGood = createAsyncThunk(
    'goods/fetchChangeGood',
    async ({ title, description, price, thumbnail, id }) => {
        const response = await fetch('https://dummyjson.com/products/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                description,
                price,
                thumbnail
            })
        })
        const newGood = await response.json();
        return newGood;
    }
)

const goodsSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {
        searchGoods: (state, action) => {
            state.searchValue = action.payload;

            if (action.payload) {
                state.filteredGoods.products = state.goods.products.filter((product) => {
                    if (product.title.toLowerCase().includes(action.payload.toLowerCase())) {
                        return true;
                    }
                })
            }
            else {
                state.filteredGoods.products = []
            }
        },
        closeSnack: (state, action) => {
            state[action.payload] = false;
        }
    },
    extraReducers: {
        [fetchGoods.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [fetchGoods.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.goods = action.payload;
        },
        [fetchGoods.rejected]: (state, action) => {
            state.error = true;
        },

        [fetchDeleteGood.fulfilled]: (state, action) => {
            state.filteredGoods.products = removeGoods(state.filteredGoods.products, action.payload);
            state.goods.products = removeGoods(state.goods.products, action.payload);
            state.isRemoved = true;
        },

        [fetchAddGood.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchAddGood.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.goods.products.push(action.payload);
            state.isAdded = true;
        },

        [fetchChangeGood.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchChangeGood.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.goods.products = state.goods.products.map(good => {
                if(action.payload.id == good.id) {
                    return good = action.payload
                }
                return good;
            })
            state.isChanged = true;
        }
    },

});

export const { searchGoods, closeSnack } = goodsSlice.actions;
export default goodsSlice.reducer;