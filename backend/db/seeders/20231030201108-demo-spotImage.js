'use strict';

const { SpotImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://www.home-designing.com/wp-content/uploads/2023/03/blue-rug.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://www.home-designing.com/wp-content/uploads/2023/03/blue-rug.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.home-designing.com/wp-content/uploads/2023/03/blue-rug.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.home-designing.com/wp-content/uploads/2023/03/blue-rug.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.home-designing.com/wp-content/uploads/2023/03/blue-rug.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2023/08/tropical-house.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2023/08/tropical-house.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2023/08/tropical-house.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2023/08/tropical-house.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2023/08/tropical-house.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/brutalist-vibes.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/brutalist-vibes.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/brutalist-vibes.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/brutalist-vibes.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/brutalist-vibes.jpg",
        preview: false
      }
      
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['link1', 'link2', 'link3'] }
    }, {});
  }
};