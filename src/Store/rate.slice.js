import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {sessionService} from "../Services";

export const rateMovieById = createAsyncThunk(
    'rateSlice/rateMovieById',
    async (id, value, sessionId) => {
        try {
            let poster = await sessionService.rateMovieById(id, value, sessionId);
            poster = poster['results'][0];
            return poster;
        } catch (e) {
            console.log(e.message);
        }
    }
);

export const addSessionId = createAsyncThunk(
    'rateSlice/addSessionId',
    async () => {
        try {
            let sessionId = await sessionService.getSessionId();
            sessionId = sessionId['guest_session_id'];
            return sessionId;
        } catch (e) {
            console.log(e.message);
        }
    }
);

export const removeRating = createAsyncThunk(
    'rateSlice/removeRating',
    async (id, sessionId) => {
        try {
            return await sessionService.removeRating(id, sessionId);
        } catch (e) {
            console.log(e.message);
        }
    }
);

const rateSlice = createSlice({
    name: "rateSlice",

    initialState: {
        value: null,
        sessionId: null,
        status: null,
        switcher: false,
        error: null
    },

    reducers: {
        switcherController:(state, action)=>{
            state.switcher = action.payload
        }
    },

    extraReducers: {
        [addSessionId.pending]: (state) => {
            state.status = 'Loading...';
            state.error = null;
        },
        [addSessionId.fulfilled]: (state, action) => {
            state.status = 'Loading finished!';
            state.sessionId = action.payload;
        },
        [addSessionId.rejected]: (state) => {
            state.status = 'rejected';
            state.error = 'error';
        },

        [rateMovieById.pending]: (state) => {
            state.status = 'Loading...';
            state.error = null;
        },
        [rateMovieById.fulfilled]: (state, action) => {
            state.status = 'Loading finished!';
            state.poster = action.payload;
        },
        [rateMovieById.rejected]: (state) => {
            state.status = 'rejected';
            state.error = 'error';
        },
        [removeRating.pending]: (state) => {
            state.status = 'Loading...';
            state.error = null;
        },
        [removeRating.fulfilled]: (state, action) => {
            state.status = 'Loading finished!';
            state.poster = action.payload;
        },
        [removeRating.rejected]: (state) => {
            state.status = 'rejected';
            state.error = 'error';
        }
    }

});

const rateReducer = rateSlice.reducer;
export const {switcherController} = rateSlice.actions;
export {rateReducer};
