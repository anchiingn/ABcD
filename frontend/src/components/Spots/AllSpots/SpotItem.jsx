import './SpotItem.css';
import { NavLink } from 'react-router-dom';

export default function SpotItem ({ spot }) {
    // console.log(spot)
    return (
        <div id='items'>
            <NavLink to={`spots/${spot.id}`}>
                <div id='img'>{spot.previewImage}</div>
            </NavLink>
            <div id='item_texts'>
                <div id='text_left'>
                    <div>{spot.city},{spot.state}</div>
                    <div>${spot.price} night</div>
                </div>
                <div id='text_right'>{spot.avgRating}</div>
            </div>
        </div>
    )
}