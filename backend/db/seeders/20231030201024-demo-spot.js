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
        address: "123 Harmony Lane",
        city: "Miami",
        state: "Florida",
        country: "USA",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Cultural Elegance: Bali's Legacy Villas",
        description: "Unveil Bali's architectural charm within these luxurious villas, showcasing cultural legacies and modern elegance. Explore expansive spaces and sleek lines embodying the essence of contemporary luxury and rich heritage.",
        price: 123
      },
      {
        ownerId: 2,
        address: "134 Serenity Avenue",
        city: "Saint Paul",
        state: "Minnesota",
        country: "USA",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Chic Neutrality Haven",
        description: "In these luxurious homes, opulent furnishings and exquisite accents meld, unveiling the eloquence of neutrals. They articulate elegance, comfort, and sophisticated panache, creating an unparalleled narrative of refined living.",
        price: 95.32
      },
      {
        ownerId: 3,
        address: "145 Dont Know Where",
        city: "Seattle",
        state: "Washington",
        country: "USA",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Floral Glow Haven",
        description: "Inspired by the vibrant celandine flower, this home bursts with a rich yellow palette, merging with lush plants that transcend boundaries, culminating in natural splendor.",
        price: 77.55
      },
      {
        ownerId: 1,
        address: "111 Serenity Lane",
        city: "Houston",
        state: "Texas",
        country: "USA",
        lat: 34.0544,
        lng: -118.2440,
        name: "Tranquil Serenity Haven",
        description: "Explore a unique urban space transformed by three distinct courtyards, each weaving its individual story. Embrace nature's secrets within these intimate, captivating outdoor sanctuaries, inviting immersive exploration and discovery",
        price: 120.56
      },
      {
        ownerId: 2,
        address: "235 Enchanted Falls Lane",
        city: "Houston",
        state: "Texas",
        country: "USA",
        lat: 41.8724,
        lng: -87.6503,
        name: "Enchanted Cascade Oasis",
        description: "Surrounding the pool, a vibrant water garden nurtures lush plants, while its cascade creates a mesmerizing welcome in the basement lobby.",
        price: 105.30
      },
      
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