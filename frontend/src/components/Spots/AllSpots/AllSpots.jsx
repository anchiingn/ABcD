import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkFetchSpots } from "../../../store/spotReducer";
import SpotItem from "./SpotItem";
import './AllSpots.css'

export default function AllSpots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots.Spots || {}));

    useEffect(() => {
        dispatch(thunkFetchSpots());
    }, [dispatch]);

    if (!spots) return null;

    return (
        <>
            <div id="spotList_container">
                <ul className="spotList">
                    {spots.map(spot => (
                        <div title={spot.name} key={spot.id}>
                            <div id="spotItems" key={spot.id} to={`spots/${spot.id}`}>
                                <SpotItem key={spot.id} spot={spot} />
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )
}