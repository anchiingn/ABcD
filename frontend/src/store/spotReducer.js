import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/loadSpots';
const GET_SPOT = 'spots/getSpot';
const CREATE_SPOT = 'spots/createSpot';
const ADD_IMAGE = 'spots/addSpotImage';
const UPDATE_SPOT = 'spots/updateSpot';
const UPDATE_IMAGE = 'spots/updateImage'
const DELETE_SPOT = 'spots/deleteSpot'

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

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

export const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

//thunk action 
export const thunkFetchSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots')
    const spots = await res.json();
    dispatch(loadSpots(spots));
}

export const thunkFetchCurrentSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current')
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
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(img)
    })
    if (res.ok) {
        const image = await res.json();
        dispatch(createSpot(image));
        return image;
    }
}

export const thunkfetchUpdateImage = (spotId, imageId, img) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images/${imageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(img)
    })
    if (res.ok) {
        const image = await res.json();
        dispatch(createSpot(image));
        return image;
    }
}

export const thunkFetchUpdateSpot = (spotId,updatedSpot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSpot)
    });
    const spot = await res.json();
    dispatch(getSpot(spot));
    return spot
}

export const thunkFetchRemoveSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(deleteSpot(spotId))
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
        case UPDATE_SPOT:
            return { ...state, [action.spot.id]: action.spot };
        case ADD_IMAGE:
            return { ...state, ...action.image };
        case DELETE_SPOT: {
            let newState = { ...state };
            delete newState[action.spotId];
            return newState;
        }
        default:
            return state;
    }
};
