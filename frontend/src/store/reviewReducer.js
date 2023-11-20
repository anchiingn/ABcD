const LOAD_REVIEWS = 'reviews/loadReviews';

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

//thunk action 
export const thunkFetchReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)
    const reviews = await res.json();
    dispatch(loadReviews(reviews));
}

//reducer
const initialState = {};
export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            return { ...state, ...action.reviews };
        default:
            return state
    }
}