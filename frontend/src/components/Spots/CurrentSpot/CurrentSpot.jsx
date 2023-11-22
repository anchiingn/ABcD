import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkFetchCurrentSpots } from "../../../store/spotReducer";
import SpotItem from '../AllSpots/SpotItem';
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeleteSpot from "../DeleteSpot/DeleteSpot";

export default function CurrentSpot() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots.Spots || {}));
    const navigation = useNavigate()
    useEffect(() => {
        dispatch(thunkFetchCurrentSpots());
    }, [dispatch]);

    return (
        <>
            <div>
                <div>Manage Your Spots</div>
                <NavLink to={'/spots/new'}>
                    <button>Create a New Spot</button>
                </NavLink>
            </div>
            <div>
                <ul id="spotList">
                    {spots.map(spot => (
                        <div>
                            <SpotItem key={spot.id} spot={spot} />
                            <NavLink to={`/spots/update/${spot.id}`}>
                                <button>Update</button>
                            </NavLink>
                            <OpenModalButton
                                buttonText={'Delete'}
                                modalComponent={<DeleteSpot spot={spot} />}
                            />
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )
}