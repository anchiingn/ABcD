import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkFetchRemoveSpot } from "../../../store/spotReducer";

export default function DeleteSpot ({ spot }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const removeSpot = () => {
        dispatch(thunkFetchRemoveSpot(spot.id))
        .then(closeModal)
    }

    return (
        <>
        <div>
            <div>Confirm Delete</div>
            <div>Are you sure you want to remove this spot from the listing?</div>
            <button onClick={removeSpot}>Yes(Delete Spot)</button>
            <button onClick={closeModal}>No(Keep Spot)</button>
        </div>
        </>
    )
}