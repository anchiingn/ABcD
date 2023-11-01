const router = require('express').Router();
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors,  } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage } = require('../../db/models');

//Delete a Spot Image x
router.delete('/:imageId', requireAuth, async (req, res) => {
    const image = await SpotImage.findByPk(req.params.imageId);

    if (!image) res.status(404).json({ "message": "Spot image couldn't be found" });
    
    const spot = await Spot.findByPk(image.spotId);

    if (spot.ownerId !== req.user.id) {
        return res.status(403).json({ "message": "Forbidden" });
    }

    await image.destroy();

    res.json({ "message": "Successfully deleted" });
});



module.exports = router