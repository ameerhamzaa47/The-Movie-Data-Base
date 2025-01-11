// src/redux/itemSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: number;
  title: string;
  overview: string;
  type: string;
  imageUrl: string;
  releaseDate: string;
}

interface ItemState {
  items: Item[];
  filteredItems: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
};

// Async thunk to fetch movies, TV shows, and trailers
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (query: string) => {
    const [moviesResponse, tvShowsResponse, trailersResponse] = await Promise.all([
      fetch('http://localhost:5000/Movies'),
      fetch('http://localhost:5000/TVShows'),
      fetch('http://localhost:5000/Trailer')
    ]);

    const moviesData = await moviesResponse.json();
    const tvShowsData = await tvShowsResponse.json();
    const trailersData = await trailersResponse.json();

    const allItems = [
      ...moviesData.map((item: any) => ({ ...item, type: 'Movie' })),
      ...tvShowsData.map((item: any) => ({ ...item, type: 'TV Show' })),
      ...trailersData.map((item: any) => ({ ...item, type: 'Trailer' }))
    ];

    return { allItems, query };
  }
);

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setFilteredItems(state, action: PayloadAction<Item[]>) {
      state.filteredItems = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.allItems;
        state.filteredItems = action.payload.allItems.filter((item) =>
          item.title.toLowerCase().includes(action.payload.query.toLowerCase())
        );
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch items';
      });
  }
});

export const { setFilteredItems } = itemSlice.actions;
export default itemSlice.reducer;