const router = require('express').Router();
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors,  } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage } = require('../../db/models');

//Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const image = await ReviewImage.findByPk(req.params.imageId)
    
    if (!image) res.status(404).json({ "message": "Review Image couldn't be found" });
    
    const review = await Review.findByPk(image.reviewId);

    if (review.userId !== req.user.id) {
        return res.status(403).json({ "message": "Forbidden" });
    }
    
    await image.destroy();
    
    res.json({ "message": "Successfully deleted" });
})

module.exports = router