const LOAD_SPOTS = 'spots/loadSpots';
const GET_SPOT = 'spots/getSpot';

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const getSpot = (spots) => ({
    type: GET_SPOT,
    spots
});

//thunk action 
export const thunkFetchSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots')
    const spots = await res.json();
    dispatch(loadSpots(spots));
}

export const thunkFetchSpotDetails = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`)
    const spots = await res.json();
    dispatch(getSpot(spots));
}

//reducer
const initialState = {};
export const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            return { ...state, ...action.spots };
        case GET_SPOT:
            return { ...state, ...action.spots };
        default:
            return state
    }
}