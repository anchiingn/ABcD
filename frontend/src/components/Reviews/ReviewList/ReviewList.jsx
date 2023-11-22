import { useSelector } from 'react-redux';
import './ReviewList.css';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import DeleteReview from '../DeleteReview/DeleteReview';
import UpdateReview from '../UpdateReview/UpdateReview';

export default function ReviewList({ review, spots }) {
    const sessionUser = useSelector((state) => state.session.user);

    const date = new Date(review.createdAt);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    if (!review || !review.User) return null
    return (
        <>
            <div>{review.User.firstName}</div>
            <div>{month} {year}</div>
            <div>{review.review}</div>
            {sessionUser && sessionUser.id === review.userId && (
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