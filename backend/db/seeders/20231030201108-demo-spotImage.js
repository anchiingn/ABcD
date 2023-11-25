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
        url: "https://www.home-designing.com/wp-content/uploads/2023/08/tropical-house.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://www.home-designing.com/wp-content/uploads/2023/08/tropical-villa.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.home-designing.com/wp-content/uploads/2023/08/bed-runner.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.home-designing.com/wp-content/uploads/2023/08/small-kitchen.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.home-designing.com/wp-content/uploads/2023/08/tropical-bedroom.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2023/09/luxury-home-exterior.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2023/09/wood-coffee-table-1.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2023/09/wood-dining-table.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2023/09/yellow-bed-set.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2023/09/metal-balustrades.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2023/08/ceiling-fan.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2023/08/glass-coffee-table.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2023/08/oval-coffee-table.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2023/08/wood-flooring-2.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2023/08/landscaping.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://www.home-designing.com/wp-content/uploads/2023/07/Indo-French-architecture.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://www.home-designing.com/wp-content/uploads/2023/07/red-brick-architecture.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://www.home-designing.com/wp-content/uploads/2023/07/red-brick-home.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://www.home-designing.com/wp-content/uploads/2023/07/Indo-French-house.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/brutalist-vibes.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/modern-home-design.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/modrn-kitchen-diner.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/water-garden.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/water-garden-inspiration.jpg",
        preview: false
      },
      
      
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