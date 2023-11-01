const router = require('express').Router();
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage } = require('../../db/models');

const validateReview = [
    check('review').notEmpty().withMessage('Review text is required'),
    check('stars').isInt({ min: 1, max: 5 }).withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors, // Custom validation error handler
]

//Get all Reviews of the Current User x
router.get('/current', requireAuth, async (req, res) => {
    const review = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: SpotImage
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }]
    });

    const allReview = [];
    review.forEach(review => {
        allReview.push(review.toJSON())
    });

    allReview.forEach(review => {
        review.Spot.previewImage = 'url link';

        delete review.Spot.SpotImages
    })
    res.json({ Review: allReview })
});

//Add an Image to a Review based on the Review's id x
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body;

    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        res.status(404)
        return res.json({ "message": "Review couldn't be found" });
    }
    
    if (review.userId !== req.user.id) {
        res.status(403);
        return res.json({
            "message": "Forbidden"
        })
    };

    const countImage = await ReviewImage.count({
        where: {
            reviewId: review.id
        }
    })

    if (countImage >= 10) {
        res.status(500)
        return res.json({ "message": "Maximum number of images for this resource was reached" });
    }

    if (review.userId === req.user.id) {
        const image = await ReviewImage.create({
            reviewId: review.id,
            url
        })
        const images = await ReviewImage.findByPk(image.id, {
            attributes: ['id', 'url']
        })

        return res.json(images)
    }

});

//Edit a Review x
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body;
    const reviews = await Review.findByPk(req.params.reviewId);

    if (!reviews) {
        res.status(404)
        return res.json({ "message": "Review couldn't be found" });
    }

    if (reviews.userId !== req.user.id) {
        res.status(403);
        return res.json({
            "message": "Forbidden"
        })
    };

    if (reviews && reviews.userId === req.user.id) {
        const newReview = await reviews.update({
            review,
            stars
        });

        return res.json(newReview);
    }
    
});

//Delete a Review x
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);
    
    if (!review) res.status(404).json({ "message": "Review couldn't be found" });

    if (review.userId !== req.user.id) {
        res.status(403);
        return res.json({
            "message": "Forbidden"
        })
    };


    await review.destroy();

    res.json({ "message": "Successfully deleted" });

});

module.exports = router