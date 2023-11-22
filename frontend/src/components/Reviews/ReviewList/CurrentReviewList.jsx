import { useSelector } from 'react-redux';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import DeleteReview from '../DeleteReview/DeleteReview';
import UpdateReview from '../UpdateReview/UpdateReview';

export default function CurrentReviewList({ review, spots }) {
    console.log(spots)
    const sessionUser = useSelector((state) => state.session.user);

    const date = new Date(review.createdAt);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // const spot = spots.find(spot => spot.id === review.id);

    if (!review || !review.User) return null
    return (
        <>
            {/* {spot && <div>{spot.name}</div>} */}
            
            <div>{month} {year}</div>
            <div>{review.review}</div>
            {sessionUser.id === review.userId && (
                <>
                    <OpenModalButton
                        buttonText={'Update'}
                        modalComponent={<UpdateReview spots={spots}/>}
                    />
                    <OpenModalButton
                        buttonText={'Delete'}
                        modalComponent={<DeleteReview review={review} />}
                    />
                </>
            )}
        </>
    )
}