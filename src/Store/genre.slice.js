import {createSlice} from "@reduxjs/toolkit";
import {genreBadgeService} from "../Services";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAllGenres = createAsyncThunk(
    'genreSlice/getAllGenres',
    async () => {
        try {
            let genres = await genreBadgeService.getAll();
            genres = genres['genres'];
            return genres;
        } catch (e) {
            console.log(e.message);
        }
    }
);

const genreSlice = createSlice({
    name: "genreSlice",
    initialState: {
        genres: [],
        status: null,
        error: null
    },
    extraReducers: {
        [getAllGenres.pending]: (state) => {
            state.status = 'Loading...';
            state.error = null;
        },
        [getAllGenres.fulfilled]: (state, action) => {
            state.status = 'Loading finished!';
            state.genres = action.payload;
        },
        [getAllGenres.rejected]: (state) => {
            state.status = 'rejected';
            state.error = 'error';
        }
    }

});

const genreReducer = genreSlice.reducer;
export {genreReducer};
