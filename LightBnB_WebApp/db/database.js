const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  const query = `SELECT * FROM users WHERE email = $1;`;

  return pool
    .query(query, [email])
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      return null;
    });

};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  const query = `SELECT * FROM users WHERE id = $1;`;

  return pool
    .query(query, [id])
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      return null;
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {

  const query = `INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *;`;

  return pool
    .query(query, [user.email, user.name, user.password])
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err);
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  const query = `SELECT reservations.*, properties.*, AVG(property_reviews.rating) as average_rating
                  FROM reservations
                  JOIN properties ON reservations.property_id = properties.id
                  JOIN property_reviews ON properties.id = property_reviews.property_id
                  WHERE reservations.guest_id = $1
                  GROUP BY reservations.id, properties.id
                  ORDER BY reservations.start_date
                  LIMIT $2;`;

  return pool
    .query(query, [guest_id, limit])
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log(err);
    });

};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  const query = `SELECT * FROM properties LIMIT $1`;

  return pool
    .query(query, [limit])
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.error(err.message);
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
