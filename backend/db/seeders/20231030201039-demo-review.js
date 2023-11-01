'use strict';

const { Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review:  "Not bad but not good",
        stars: 3
      },
      {
        spotId: 1,
        userId: 2,
        review:  "This was an awesome spot!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review:  "Good!!",
        stars: 4
      },
      {
        spotId: 3,
        userId: 2,
        review:  "Not Nice!!",
        stars: 1
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      stars: { [Op.in]: [1,3,4,5] }
    }, {});
  }
};