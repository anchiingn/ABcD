import './SpotItem.css';
import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import OpenModalButton from '../../OpenModalButton/OpenModalButton';
// import DeleteSpot from '../DeleteSpot/DeleteSpot';

export default function SpotItem({ spot }) {
    // const sessionUser = useSelector((state) => state.session.user);

    return (
        <div id='items'>
            <NavLink exact to={`spots/${spot.id}`} style={{textDecoration: 'none', color: 'black'}}>
                <div id='img_container'>
                    {/* <div id='img'>Image Here</div> */}
                    <img src={`${spot.previewImage}`} alt={`${spot.name}`} />
                </div>
                <div id='item_texts' >
                    <div id='text_left' >
                        <div>{spot.city}, {spot.state}</div>
                        <div>${spot.price} <div>night</div></div>
                    </div>
                    {spot.avgRating !== 0 && (
                        <div id='text_right'>
                            <div>
                            <i className="fa-solid fa-star"></i>
                            <div>{spot.avgRating}</div>
                            </div>
                        </div>
                    )}
                </div>
            </NavLink>
        </div>
    )
}