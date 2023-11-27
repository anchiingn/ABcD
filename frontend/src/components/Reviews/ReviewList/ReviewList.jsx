import { useSelector } from 'react-redux';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import DeleteReview from '../DeleteReview/DeleteReview';
import UpdateReview from '../UpdateReview/UpdateReview';
import './ReviewList.css';

export default function ReviewList({ review, spot }) {
    const sessionUser = useSelector((state) => state.session.user);
    

    const date = new Date(review.createdAt);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    if (!review || !review.User) return null

    
    return (
        <>
            <div id='reviewList_container'>
                <div>{review.User.firstName}</div>
                <div>{month} {year}</div>
                <div>{review.review}</div>
                {sessionUser && sessionUser.id === review.userId && (
                    <>
                        <OpenModalButton
                            buttonText={'Update'}
                            modalComponent={<UpdateReview spot={spot} />}
                        />
                        <OpenModalButton
                            buttonText={'Delete'}
                            modalComponent={<DeleteReview review={review} />}
                        />
                    </>
                )}
            </div>
        </>
    )
}