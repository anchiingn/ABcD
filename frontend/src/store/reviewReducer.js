import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/loadReviews';
const ADD_REVIEWS = 'reviews/addReviews'

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

export const addReviews = (reviews) => ({
    type: ADD_REVIEWS,
    reviews
});

//thunk action 
export const thunkFetchReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const reviews = await res.json();
    dispatch(loadReviews(reviews));
}

export const thunkFetchAddReview = (reviewObj) => async (dispatch) => {

    const res = await csrfFetch(`/api/spots/${reviewObj.spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewObj)
    })

    if (res.ok) {
        const newReview = await res.json()
        dispatch(addReviews(newReview))
    } else {
        const errors = await res.json()
        return errors
    }

}

//reducer
const initialState = {};
export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            return { ...state, ...action.reviews };
        case ADD_REVIEWS:
            return { ...state, [action.review.id]: action.review };
        default:
            return state
    }
}