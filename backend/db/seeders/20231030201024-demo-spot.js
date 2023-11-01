'use strict';

const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },
      {
        ownerId: 2,
        address: "134 Cougar Drive",
        city: "Saint Paul",
        state: "Minnesota",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "MCDonale",
        description: "Yummy Bun",
        price: 45.32
      },{
        ownerId: 3,
        address: "145 Dont Know Where",
        city: "Houston",
        state: "Texas",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Hello",
        description: "Place where we play",
        price: 77.55
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      city: { [Op.in]: ['San Francisco', 'Saint Paul', 'Houston'] }
    }, {});
  }
};