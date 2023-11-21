import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/loadSpots';
const GET_SPOT = 'spots/getSpot';
const CREATE_SPOT = 'spots/createSpot';
const ADD_IMAGE = 'spots/addSpotImage'

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const getSpot = (spots) => ({
    type: GET_SPOT,
    spots
});

export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})

export const addSpotImage = (image) => ({
    type: ADD_IMAGE,
    image
})

//thunk action 
export const thunkFetchSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots')
    const spots = await res.json();
    dispatch(loadSpots(spots));
}

export const thunkFetchSpotDetails = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    const spots = await res.json();
    dispatch(getSpot(spots));
}

export const thunkFetchNewSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })
    if (res.ok) {
        const spot = await res.json();
        dispatch(createSpot(spot));
        return spot;
    }
}

export const thunkFetchImg = (spotId, img) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, { 
        method: "POST",
        headers : {  "Content-Type": "application/json",
     },
        body: JSON.stringify(img)
     }) 
     if (res.ok) {
        const image = await res.json();
        dispatch(createSpot(image));
        return image;
     }
}

//reducer
const initialState = {};
export const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            return { ...state, ...action.spots };
        case GET_SPOT:
            return { ...state, ...action.spots };
        case CREATE_SPOT:
            return { ...state, [action.spot.id]: action.spot };
        case ADD_IMAGE:
            return { ...state, ...action.image };
        default:
            return state
    }
}