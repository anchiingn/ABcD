import './ReviewList.css';

export default function ReviewList ({ review }) {
   console.log(review)
    return (
        <>
            <h1>{review.review}</h1>
        </>
    )
}