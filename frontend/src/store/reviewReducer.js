import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/loadReviews';
const ADD_REVIEWS = 'reviews/addReviews';
const DELETE_REVIEW = 'reviews/removeReview';

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

export const addReviews = (reviews) => ({
    type: ADD_REVIEWS,
    reviews
});

export const removeReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

//thunk action 
export const thunkFetchReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const reviews = await res.json();
    dispatch(loadReviews(reviews));
}

export const thunkFetchCurrentReviews = () => async (dispatch) => {
    const res = await csrfFetch('/api/reviews/current')
    const reviews = await res.json();
    dispatch(loadReviews(reviews));
}

export const thunkFetchAddReview = (spotId, review) => async (dispatch) => {

    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const newReview = await res.json()
        dispatch(addReviews(newReview))
    }
}

export const thunkFetchRemoveReview = (reviewId) => async (dispatch) => {

    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(removeReview(reviewId))
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
        case DELETE_REVIEW:
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        default:
            return state
    }
}