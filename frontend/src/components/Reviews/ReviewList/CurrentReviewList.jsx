import { useSelector } from 'react-redux';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import DeleteReview from '../DeleteReview/DeleteReview';

export default function CurrentReviewList({ review, spots }) {
    console.log(spots)
    const sessionUser = useSelector((state) => state.session.user);

    const date = new Date (review.createdAt);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    if (!review || !review.User) return null
    return (
        <>
            {spots.map(spot => {
                return <div key={spot.id}>{spot.name}</div>
            })}
            <div>{month} {year}</div>
            <div>{review.review}</div>
            {sessionUser.id === review.userId && (
                <OpenModalButton 
                    buttonText={'Delete'}
                    modalComponent={<DeleteReview review={review}/>}
                />
            )}
        </>
    )
}