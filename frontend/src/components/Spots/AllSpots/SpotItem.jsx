import './SpotItem.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import DeleteSpot from '../DeleteSpot/DeleteSpot';

export default function SpotItem({ spot }) {
    const sessionUser = useSelector((state) => state.session.user);
    console.log(spot)

    return (
        <div id='items'>
            <NavLink to={`spots/${spot.id}`} style={{textDecoration: 'none', color: 'black'}}>
                <div id='img_container'>
                    {/* <div id='img'>Image Here</div> */}
                    <img src={`${spot.previewImage}`} alt={`${spot.name}`} />
                </div>
                <div id='item_texts' >
                    <div id='text_left' >
                        <div>{spot.city},{spot.state}</div>
                        <div>${spot.price} night</div>
                    </div>
                    <div id='text_right'>
                        <i className="fa-solid fa-star"></i>
                        {spot.avgRating}
                    </div>
                </div>
            </NavLink>
        </div>
    )
}