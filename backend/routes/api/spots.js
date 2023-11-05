const router = require('express').Router();
const bcrypt = require("bcryptjs");
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Booking, User, Review, ReviewImage, SpotImage } = require('../../db/models');

const validateSpot = [
    check('address').notEmpty().withMessage('Street address is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('state').notEmpty().withMessage('State is required'),
    check('country').notEmpty().withMessage('Country is required'),
    check('lat').isNumeric().withMessage('Latitude is not valid'),
    check('lng').isNumeric().withMessage('Longitude is not valid'),
    check('name').isLength({ max: 50 }).withMessage('Name must be less than 50 characters'),
    check('description').notEmpty().withMessage('Description is required'),
    check('price').notEmpty().isFloat({ gt: 0 }).withMessage('Price per day is required'),
    handleValidationErrors,
];

const validateReview = [
    check('review').notEmpty().withMessage('Review text is required'),
    check('stars').isInt({ min: 1, max: 5 }).withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors,
];


router.get('/', async (req, res) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice, type, city, state, country } = req.query;

    if (page || size || minLat || maxLat || minLng || maxLng || minPrice || maxPrice || type || city || state || country) {

        if (!page) page = parseInt(page) || 1;
        if (!size) size = parseInt(page) || 20;

        let pagination = {};
        if (size >= 1 && page >= 1 && size <= 20 && page <= 10) {
            pagination.limit = size;
            pagination.offset = size * (page - 1);
        }

        let filter = {};

        if (minLat) {
            filter.lat = { [Op.gte]: minLat };
        }
        if (maxLat) {
            filter.lat = { [Op.lte]: maxLat };
        }
        if (minLng) {
            filter.lng = { [Op.gte]: minLng };
        }
        if (maxLng) {
            filter.lng = { [Op.lte]: maxLng };
        }
        if (minPrice && minPrice >= 0) {
            filter.price = { [Op.gte]: minPrice };
        }
        if (maxPrice && maxPrice >= 0) {
            filter.price = { [Op.lte]: maxPrice };
        }
        if (type) {
            filter.type = type;
        }
        if (city) {
            filter.city = city;
        }
        if (state) {
            filter.state = state;
        }
        if (country) {
            filter.country = country;
        }

        let errors = {};

        if (page < 1 || page > 10) {
            errors.page = "Page must be between 1 and 10";
        }

        if (size < 1 || size > 20) {
            errors.size = "Size must be between 1 and 20";
        }

        if (minPrice < 0) {
            errors.minPrice = "Minimum price must be greater than or equal to 0";
        }

        if (maxPrice < 0) {
            errors.maxPrice = "Maximum price must be greater than or equal to 0";
        }

        if (!minLat) {
            errors.minLat = "Minimum latitude is invalid";
        }

        if (!minLat) {
            errors.minLat = "Minimum latitude is invalid";
        }

        if (!maxLat) {
            errors.maxLat = "Maximum latitude is invalid";
        }

        if (!minLng) {
            errors.minLng = "Minimum longitude is invalid";
        }

        if (!maxLng) {
            errors.maxLng = "Maximum longitude is invalid";
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                "message": "Bad Request",
                "errors": errors
            });
        }

        const spots = await Spot.findAll({
            include: [{ model: Review }, { model: SpotImage }],
            where: { ...filter }
        });

        const allSpots = spots.map(spot => {
            const spots = spot.toJSON();
            let rate = 0;
            let imageUrl = '';
            const reviews = [];
            reviews.push(spots.Reviews);
            reviews.forEach(review => {
                review.forEach(star => {
                    rate += star.stars / review.length
                })
            });
            const images = [];
            images.push(spots.SpotImages);
            images.forEach(image => {
                image.forEach(url => {
                    imageUrl += url.url
                })
            });

            return {
                id: spots.id,
                ownerId: spots.ownerId,
                address: spots.address,
                city: spots.city,
                state: spots.state,
                country: spots.country,
                lat: spots.lat,
                lng: spots.lng,
                name: spots.name,
                description: spots.description,
                price: spots.price,
                createdAt: spots.createdAt,
                updatedAt: spots.updatedAt,
                avgRating: rate,
                previewImage: imageUrl
            }
        });

        res.json({ Spots: allSpots, page: parseInt(page), size: parseInt(size) });
    } else {
        const spots = await Spot.findAll({
            include: [{ model: Review }, { model: SpotImage }]
        });

        const allSpots = spots.map(spot => {
            const spots = spot.toJSON();
            let rate = 0;
            let imageUrl = '';
            const reviews = [];
            reviews.push(spots.Reviews);
            reviews.forEach(review => {
                review.forEach(star => {
                    rate += star.stars / review.length
                })
            });
            const images = [];
            images.push(spots.SpotImages);
            images.forEach(image => {
                image.forEach(url => {
                    imageUrl += url.url
                })
            });

            return {
                id: spots.id,
                ownerId: spots.ownerId,
                address: spots.address,
                city: spots.city,
                state: spots.state,
                country: spots.country,
                lat: spots.lat,
                lng: spots.lng,
                name: spots.name,
                description: spots.description,
                price: spots.price,
                createdAt: spots.createdAt,
                updatedAt: spots.updatedAt,
                avgRating: rate,
                previewImage: imageUrl
            }
        });

        res.json({ Spots: allSpots });
    }
});

//Get all Spots owned by the Current User x
router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id;

    const spots = await Spot.findAll({
        where: {
            ownerId: user
        },
        include: [
            { model: Review }, { model: SpotImage }
        ]
    });

    const allSpots = await spots.map(spot => {
        const spots = spot.toJSON();

        if (spots && spots.ownerId !== user) {
            res.status(403);
            return res.json({ "message": "Forbidden" })
        };

        let rate = 0;
        let imageUrl = '';

        const reviews = [];
        reviews.push(spots.Reviews);
        reviews.forEach(review => {
            review.forEach(star => {
                // console.log(star.stars)
                rate += star.stars / review.length
            })
        });

        const images = [];
        images.push(spots.SpotImages);
        images.forEach(image => {
            image.forEach(url => {
                // console.log(star.stars)
                imageUrl += url.url
            })
        });

        return {
            id: spots.id,
            ownerId: spots.ownerId,
            address: spots.address,
            city: spots.city,
            state: spots.state,
            country: spots.country,
            lat: spots.lat,
            lng: spots.lng,
            name: spots.name,
            description: spots.description,
            price: spots.price,
            createdAt: spots.createdAt,
            updatedAt: spots.updatedAt,
            avgRating: rate,
            previewImage: imageUrl
        }
    });

    res.json({ Spots: allSpots })
});

//Get details of a Spot from an id x
router.get('/:spotId', async (req, res) => {
    const id = req.params.spotId;

    const spot = await Spot.findByPk(id, {
        include: [
            { model: Review },
            { model: SpotImage, attributes: ['id', 'url', 'preview'] },
            { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] }
        ]
    });

    if (!spot) {
        res.status(404);
        res.json({ "message": "Spot couldn't be found" })
    }

    const spotJSON = spot.toJSON();

    let rate = 0;
    let reviewCount = 0;
    const reviews = [];
    reviews.push(spotJSON.Reviews);
    reviews.forEach(review => {
        review.forEach(star => {
            reviewCount++
            rate += star.stars / review.length
        });
    });

    spotJSON.numReviews = reviewCount;
    spotJSON.avgRating = rate;
    delete spotJSON.Reviews

    res.json({ Spots: spotJSON })
});

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const review = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });
    if (review.length) {
        res.json({ Review: review });
    }
    if (!review) {

    }
    res.status(404).json({ "message": "Spot couldn't be found" })
});

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        return res.status(404).json({ "message": "Spot couldn't be found" });
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    });

    if (spot.ownerId !== req.user.id) {
        const formattedBookings = bookings.map(booking => {
            const startDate = new Date(booking.startDate).toISOString().split('T')[0];
            const endDate = new Date(booking.endDate).toISOString().split('T')[0];

            return {
                spotId: booking.spotId,
                startDate: startDate,
                endDate: endDate,
            };
        });

        return res.status(200).json({ "Bookings": formattedBookings })
    };

    if (spot.ownerId === req.user.id) {
        // If the user is the owner of the spot
        const formattedBookings = bookings.map(booking => {
            const startDate = new Date(booking.startDate).toISOString().split('T')[0];
            const endDate = new Date(booking.endDate).toISOString().split('T')[0];

            return {
                id: booking.id,
                spotId: booking.spotId,
                userId: booking.userId,
                startDate: startDate,
                endDate: endDate,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt,
                User: {
                    id: booking.User.id,
                    firstName: booking.User.firstName,
                    lastName: booking.User.lastName
                }
            };
        });

        return res.status(200).json({ "Bookings": formattedBookings })
    }

    res.status(404).json({ "message": "Spot couldn't be found" })
});

//Create a Spot x
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    return res.json(newSpot);
});

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    if (spot && spot.ownerId === req.user.id) {
        const newSpotImage = await SpotImage.create({
            url,
            preview,
            spotId: req.params.spotId
        });

        const image = await SpotImage.findByPk(newSpotImage.id, {
            attributes: ['id', 'url', 'preview']
        })
        return res.json(image)
    }
    else if (spot && spot.ownerId !== req.user.id) {
        res.status(403);
        return res.json({
            "message": "Forbidden"
        });
    } else {
        res.status(404);
        return res.json({ "message": "Spot couldn't be found" });
    }
});

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body;

    const existReview = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: req.params.spotId
        }
    });

    if (existReview) {
        res.status(500)
        return res.json({ "message": "User already has a review for this spot" });
    };

    const spot = await Spot.findByPk(req.params.spotId);

    if (spot) {
        const reviews = await Review.create({
            userId: req.user.id,
            spotId: parseInt(req.params.spotId),
            review,
            stars
        })
        return res.json(reviews);
    }

    res.status(404)
    return res.json({ "message": "Spot couldn't be found" });
});

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404)
        return res.json({ "message": "Spot couldn't be found" });
    }

    if (spot.ownerId === req.user.id) {
        res.status(403);
        return res.json({ "message": "Forbidden" });
    };

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    if (end <= start) {
        res.status(400);
        return res.json({
            "message": "Bad Request",
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        })
    };

    const existingBookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId,
        }
    });

    const isConflict = existingBookings.some(booking => {
        const bookingStart = new Date(booking.startDate).getTime();
        const bookingEnd = new Date(booking.endDate).getTime();

        return (
            (start >= bookingStart && start <= bookingEnd) ||
            (end >= bookingStart && end <= bookingEnd) ||
            (start <= bookingStart && end >= bookingEnd)
        );
    });

    if (isConflict) {
        res.status(403);
        return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        });
    }

    if (spot) {
        const formattedStart = new Date(startDate).toISOString().split('T')[0];
        const formattedEnd = new Date(endDate).toISOString().split('T')[0];

        const newBooking = await Booking.create({
            startDate: formattedStart,
            endDate: formattedEnd,
            spotId: parseInt(req.params.spotId),
            userId: req.user.id
        });

        return res.json(newBooking);
    }

});

//Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const id = req.params.spotId;
    const user = req.user.id;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(id);

    if (spot && spot.ownerId === user) {
        await spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        res.json(spot)
    } else if (spot && spot.ownerId !== user) {
        res.status(403);
        res.json({ "message": "Forbidden" })
    } else {
        res.status(404);
        res.json({ "message": "Spot couldn't be found" })
    }
});

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const id = req.params.spotId;
    const user = req.user.id;

    const spot = await Spot.findByPk(id);

    if (spot && spot.ownerId === user) {
        await spot.destroy()
        res.json({ message: 'Successfully deleted' })
    } else if (spot && spot.ownerId !== user) {
        res.status(403);
        res.json({ "message": "Forbidden" })
    } else {
        res.status(404);
        res.json({ "message": "Spot couldn't be found" })
    }
});

module.exports = router;