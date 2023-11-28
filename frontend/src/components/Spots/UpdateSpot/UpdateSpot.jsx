import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { thunkFetchUpdateSpot, thunkFetchImg, thunkFetchSpotDetails, thunkfetchUpdateImage} from '../../../store/spotReducer';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function UpdateSpot() {
    const { spotId } = useParams();

    const dispatch = useDispatch();
    const navigation = useNavigate()
    let imgs;

    const spotDetail = useSelector(state => state.spots.Spots)

    useEffect(() => {
        dispatch(thunkFetchSpotDetails(spotId))
    },[spotId])

    // console.log(spotDetail)
    // if (!spotDetail) return null

    // const previewImg = spotDetail.SpotImages.forEach(img => img)
    let previewImg;

    for (let i = 0; i < spotDetail?.SpotImages?.length; i++) {
        // console.log(spotDetail.SpotImages[0])
        if (spotDetail?.SpotImages[i].preview){
            previewImg  = spotDetail?.SpotImages[i];
        }
    }

    // console.log(spotDetail?.country)

    const [country, setCountry] = useState(spotDetail?.country);
    const [address, setAddress] = useState(spotDetail?.address);
    const [city, setCity] = useState(spotDetail?.city);
    const [state, setState] = useState(spotDetail?.state);
    const [latitude, setLatitude] = useState(spotDetail?.latitude);
    const [longtitude, setLongtitude] = useState(spotDetail?.longtitude);
    const [description, setDescription] = useState(spotDetail?.description);
    const [name, setName] = useState(spotDetail?.name);
    const [price, setPrice] = useState(spotDetail?.price);
    const [preview, setPreview] = useState(previewImg?.url);
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [validation, setValidation] = useState({});
    const [submit, setSubmit] = useState(false)


    console.log(country)

    useEffect(() => {
        const error = {};
        // setCountry(spotDetail?.country)

        if (submit) {
            if (!country) {
                error.country = "Country is required";
            }
            if (!address) {
                error.address = "Address is required";
            }
            if (!city) {
                error.city = "City is required";
            }
            if (!state) {
                error.state = "State is required";
            }
            if (!latitude) {
                error.latitude = "Latitude is required";
            }
            if (!longtitude) {
                error.longtitude = "Longtitude is required";
            }
            if (!description) {
                error.description = "Description needs a minimum of 30 characters";
            }
            if (!name) {
                error.name = "Title is required";
            }
            if (!price) {
                error.price = "Price is required";
            }
            // if (!preview && preview.trim() !== '') {
            //     error.preview = "Preview is required";
            // }
            imgs = [image1, image2, image3, image4];
            imgs.forEach(img => {
                if (img.trim() !== '' && (!img.endsWith('.jpg') || !img.endsWith('.png') || !img.endsWith('.jpeg'))) {
                    error.imgs = "Image URL must end in .png, .jpg, or .jpeg"
                }
            })
        }

        setValidation(error)

    }, [country, address, city, state, latitude, longtitude, description, name, price, preview, submit])

    const onSubmit = async (e) => {
        e.preventDefault()
        setSubmit(true)

        console.log(e)

        const newSpot = {
            country,
            address,
            city,
            state,
            lat: parseFloat(latitude),
            lng: parseFloat(longtitude),
            description,
            name,
            price: parseFloat(price),
        }

        const spot = await dispatch(thunkFetchUpdateSpot(spotId,newSpot));

        if (preview !== '') {
            if (previewImg) {
                const imageObj = { spotId: spot.id, url: preview, preview: true }
                await dispatch(thunkfetchUpdateImage(spot.id, previewImg.id, imageObj))
            } else {
                const imageObj = { spotId: spot.id, url: preview, preview: true }
                await dispatch(thunkFetchImg(spot.id,imageObj))
            }
        }

        if (image1 !== '') {
            const imageObj = { spotId: spot.id, url: image1, preview: false }
            await dispatch(thunkFetchImg(spot.id,imageObj))
        }

        if (image2 !== '') {
            const imageObj = { spotId: spot.id, url: image2, preview: false }
            await dispatch(thunkFetchImg(spot.id,imageObj))
        }

        if (image3 !== '') {
            const imageObj = { spotId: spot.id, url: image3, preview: false }
            await dispatch(thunkFetchImg(spot.id,imageObj))
        }

        if (image4 !== '') {
            const imageObj = { spotId: spot.id, url: image4, preview: false }
            await dispatch(thunkFetchImg(spot.id,imageObj))
        }

        navigation(`/spots/${spot.id}`)
    }

    return (
        <>
            <div id='form_container'>
                <div>
                    <div id='form_texts'>
                        <h1>Update your Spot</h1>
                        <h3>Where&apos;s your place located?</h3>
                        <h4>Guests will only get your exact address once they booked a reservation.</h4>
                    </div>
                    <form id='new_spot_form' className='form' onSubmit={onSubmit}>
                        <label> Country</label>
                        <input
                            type="text"
                            placeholder={spotDetail?.country}
                            defaultValue={spotDetail?.country}
                            // value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <span className='errors'>{validation.country && `* ${validation.country}`}</span>

                        <label> Street Address</label>
                        <input
                            type="text"
                            placeholder={spotDetail?.address}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <span className='errors'>{validation.address && `* ${validation.address}`}</span>

                        <label> City</label>
                        <input
                            type="text"
                            placeholder={spotDetail?.city}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <span className='errors'>{validation.city && `* ${validation.city}`}</span>

                        <label> State</label>
                        <input
                            type="text"
                            placeholder={spotDetail?.state}
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />
                        <span className='errors'>{validation.state && `* ${validation.state}`}</span>

                        <label> Latitude</label>
                        <input
                            type="text"
                            placeholder={spotDetail?.lat}
                            value={latitude}
                            onChange={e => setLatitude(e.target.value)}
                        />
                        <span className='errors'>{validation.latitude && `* ${validation.latitude}`}</span>

                        <label> Longtitude</label>
                        <input
                            type="text"
                            placeholder={spotDetail?.lng}
                            value={longtitude}
                            onChange={e => setLongtitude(e.target.value)}
                        />
                        <span className='errors'>{validation.longtitude && `* ${validation.longtitude}`}</span>


                        <h4>Describe your place to guests</h4>
                        <p>Mention the best features of your space, any special amentities like <br />
                            fast wifi or parking, and what you love about the neighborhood.</p>
                        <textarea
                            placeholder={spotDetail?.description}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <span className='errors'>{validation.description && `* ${validation.description}`}</span>

                        <h4>Create a title for your spot</h4>
                        <p>Catch guest&apos; attention with a spot title that highlights what makes <br />
                            your place specials</p>
                        <input
                            type="text"
                            placeholder={spotDetail?.name}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <span className='errors'>{validation.name && `* ${validation.name}`}</span>

                        <h4>Set a base price for your spot</h4>
                        <p>Competitive pricing can help your listing stand out and rank higher <br />
                            in search results.</p>
                        <div>
                            $
                            <input
                                type="text"
                                placeholder={spotDetail?.price}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                        <span className='errors'>{validation.price && `* ${validation.price}`}</span>


                        <h4>Liven up your spot with photos</h4>
                        <p>Submit a link to at least one photo to publish your spot</p>
                        <input
                            type="text"
                            placeholder={spotDetail?.country}
                            value={preview}
                            onChange={e => setPreview(e.target.value)}
                        />
                        <span className='errors'>{validation.preview && `* ${validation.preview}`}</span>

                        <input
                            type="text"
                            placeholder='Image URL'
                            value={image1}
                            onChange={e => setImage1(e.target.value)}
                        />
                        <span className='errors'>{validation.imgs && `* ${validation.imgs}`}</span>

                        <input
                            type="text"
                            placeholder='Image URL'
                            value={image2}
                            onChange={e => setImage2(e.target.value)}
                        />
                        <span className='errors'>{validation.imgs && `* ${validation.imgs}`}</span>

                        <input
                            type="text"
                            placeholder='Image URL'
                            value={image3}
                            onChange={e => setImage3(e.target.value)}
                        />
                        <span className='errors'>{validation.imgs && `* ${validation.imgs}`}</span>

                        <input
                            type="text"
                            placeholder='Image URL'
                            value={image4}
                            onChange={e => setImage4(e.target.value)}
                        />
                        <span className='errors'>{validation.imgs && `* ${validation.imgs}`}</span>

                        <div id='button'>
                            <button disabled={Object.keys(validation).length > 0}>Update your Spot</button>
                        </div>


                    </form>
                </div>
            </div>
        </>
    )
}