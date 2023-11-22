import { useSelector } from 'react-redux';
import './ReviewList.css';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteReview from './DeleteReview/DeleteReview';

export default function ReviewList({ review, spot }) {
    const sessionUser = useSelector((state) => state.session.user);

    const date = new Date (review.createdAt);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    if (!review || !review.User) return null
    return (
        <>
            <div>{review.User.firstName}</div>
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