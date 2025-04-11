import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Cocktail, CocktailCode } from '../types/cocktail';
import { getCocktailsByCode } from '../api/cocktailsApi';

interface CocktailsState {
  items: Record<CocktailCode, Cocktail[]>;
  loading: boolean;
  error: string | null;
  lastFetched: Record<CocktailCode, number>;
}

const initialState: CocktailsState = {
  items: {
    margarita: [],
    mojito: [],
    a1: [],
    kir: [],
  },
  loading: false,
  error: null,
  lastFetched: {
    margarita: 0,
    mojito: 0,
    a1: 0,
    kir: 0,
  },
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const fetchCocktails = createAsyncThunk(
  'cocktails/fetchByCode',
  async (code: CocktailCode, { getState }) => {
    const state = getState() as { cocktails: CocktailsState };
    const lastFetched = state.cocktails.lastFetched[code];
    const now = Date.now();

    if (lastFetched && now - lastFetched < CACHE_DURATION) {
      return null;
    }

    const response = await getCocktailsByCode(code);
    return { code, drinks: response.drinks };
  }
);

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCocktails.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items[action.payload.code] = action.payload.drinks;
          state.lastFetched[action.payload.code] = Date.now();
        }
      })
      .addCase(fetchCocktails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cocktails';
      });
  },
});

export default cocktailsSlice.reducer; 