import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from './store';
import { SearchHistoryType } from '../types';

const initialState: SearchHistoryType[] = [];

export const searchHistorySlice = createSlice({
  initialState,
  name: 'searchHistory',
  reducers: {
    addToSearchHistory: (
      state,
      action: PayloadAction<Omit<SearchHistoryType, 'id' | 'searchAt'>>
    ) => {
      const { location, countryCode } = action.payload;
      const id = uuidv4();
      const searchAt = new Date().getTime();
      const found = state.find((sh) => sh.location === action.payload.location);

      if (found) {
        found.searchAt = searchAt;
      } else {
        state.push({
          location,
          countryCode,
          searchAt,
          id,
        });
      }
      state.sort((a, b) => b.searchAt - a.searchAt);
    },
    removeFromSearchHistory: (state, action: PayloadAction<{ id: string }>) => {
      state.splice(
        state.findIndex((a) => a.id === action.payload.id),
        1
      );
    },
  },
});

export const { addToSearchHistory, removeFromSearchHistory } =
  searchHistorySlice.actions;

export const searchHistoryReducer = searchHistorySlice.reducer;

const selectSelf = (state: RootState) => state;

export const selectSearchHistory = createSelector(
  selectSelf,
  (state) => state.searchHistory.searchHistory
);
