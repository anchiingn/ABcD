import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkFetchRemoveSpot } from "../../../store/spotReducer";
import './DeleteSpot.css'

export default function DeleteSpot ({ spot }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const removeSpot = async (e) => {
        e.preventDefault()
        await dispatch(thunkFetchRemoveSpot(spot.id))
        .then(closeModal)
    }

    return (
        <>
        <div id='login_container' className="delete_container">
            <div>Confirm Delete</div>
            <div>Are you sure you want to remove this spot from the listing?</div>
            <div>
                <button onClick={removeSpot}>Yes (Delete Spot)</button>
                <button onClick={closeModal}>No (Keep Spot)</button>
            </div>
        </div>
        </>
    )
}