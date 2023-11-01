const router = require('express').Router();
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors, } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage } = require('../../db/models');

//Get all of the Current User's Bookings x
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: SpotImage
            }]
    });

    const bookingss = bookings.map(booking => {
        const startDate = new Date(booking.startDate).toISOString().split('T')[0];
        const endDate = new Date(booking.endDate).toISOString().split('T')[0];

        const spot = booking.Spot;
        let url;

        spot.SpotImages.forEach(image => {
            url = image.url;
        });

        return {
            id: booking.id,
            spotId: spot.id,
            Spot: {
                id: spot.id,
                ownerId: spot.ownerId,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country: spot.country,
                lat: spot.lat,
                lng: spot.lng,
                name: spot.name,
                price: spot.price,
                previewImage: url
            },
            userId: booking.userId,
            startDate: startDate,
            endDate: endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        };
    });

    res.status(200).json({ Bookings: bookingss });
});

//Edit a Booking 
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
        res.status(404)
        return res.json({ "message": "Booking couldn't be found" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date()

    if (now.getTime() > end.getTime()) {
        res.status(403)
        return res.json({ "message": "Past bookings can't be modified" })
    }

    if (end.getTime() <= start.getTime()) {
        res.status(400);
        return res.json({
            "message": "Bad Request",
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        })
    };
    const allBookings = await Booking.findAll({
        where: {
            spotId: booking.spotId,
            id: { [Op.ne]: booking.id }
        },
    });

    const isConflict = allBookings.some(booking => {
        const bookingStart = new Date(booking.startDate).getTime();
        const bookingEnd = new Date(booking.endDate).getTime();

        return (
            (start >= bookingStart && start <= bookingEnd) ||
            (end >= bookingStart && end <= bookingEnd) ||
            (start <= bookingStart && end >= bookingEnd)
        );
    });

    if (booking.userId !== req.user.id) {
        res.status(403);
        return res.json({
            "message": "Forbidden"
        });
    };

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

    if (booking && booking.userId === req.user.id) {

        const start = new Date(startDate).toISOString().split('T')[0];

        const end = new Date(endDate).toISOString().split('T')[0];

        const editBooking = await booking.update({
            startDate: start,
            endDate: end
        });

        return res.json(editBooking);
    }
});

//Delete a Booking x
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) res.status(404).json({ "message": "Booking couldn't be found" });

    const start = new Date(booking.startDate);
    const now = new Date();


    if (now >= start) {
        res.status(403).json({ "message": "Bookings that have been started can't be deleted" });
        return;
    }

    if (booking.userId !== req.user.id) {
        res.status(403);
        return res.json({
            "message": "Forbidden"
        });
    };


    await booking.destroy();

    res.json({ "message": "Successfully deleted" });
});

module.exports = router