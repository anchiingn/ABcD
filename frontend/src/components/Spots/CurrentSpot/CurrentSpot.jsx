import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkFetchCurrentSpots } from "../../../store/spotReducer";
import SpotItem from '../AllSpots/SpotItem';
import './CurrentSpot.css'

// import { useNavigate } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeleteSpot from "../DeleteSpot/DeleteSpot";

export default function CurrentSpot() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots.Spots || {}));

    if (!spots) return null;
    console.log(spots)
    // const navigation = useNavigate()
    useEffect(() => {
        dispatch(thunkFetchCurrentSpots());
    }, [dispatch]);

    return (
        <>
            <div id="manage_spots_container">
                <div >
                    <div>Manage Your Spots</div>
                    {spots.length === 0 && (
                        <NavLink to={'/spots/new'}>
                            <button>Create a New Spot</button>
                        </NavLink>
                    )}
                </div>
                <div id="manage_spots">
                    <ul id='current_spot_list'>
                        {spots.map(spot => (
                            <div key={spot.id} id="spotItems">
                                <SpotItem spot={spot} />
                                <div id='delete_update_spot'>
                                    <div>
                                        <NavLink to={`/spots/update/${spot.id}`}>
                                            <button id='update_spot'>Update</button>
                                        </NavLink>
                                    </div>
                                    <div>
                                        <OpenModalButton
                                            buttonText={'Delete'}
                                            modalComponent={<DeleteSpot spot={spot} />}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>

            </div>
        </>
    )
}