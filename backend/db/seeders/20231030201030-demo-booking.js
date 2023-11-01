'use strict';

const { Booking } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: "2021-11-19",
        endDate: "2021-11-20"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2019-12-19",
        endDate: "2020-01-05"
      },{
        spotId: 3,
        userId: 3,
        startDate: "2020-05-20",
        endDate: "2020-05-24"
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['2021-11-19', '2019-12-19', '2020-05-20'] }
    }, {});
  }
};