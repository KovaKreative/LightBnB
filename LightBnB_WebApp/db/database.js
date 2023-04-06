const properties = require("./json/properties.json");
const users = require("./json/users.json");
const db = require('.');
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  const query = `SELECT * FROM users WHERE email = $1;`;

  return db
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

  return db
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

  return db
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

  return db
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

  const queryParams = [limit];

  let query = `SELECT properties.*, AVG(property_reviews.rating) as average_rating
                  FROM properties
                  JOIN property_reviews ON properties.id = property_reviews.property_id `;
  let clause = 'WHERE';

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    query += `${clause} city LIKE $${queryParams.length} `;
    clause = 'AND';
  }
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    query += `${clause} owner_id = $${queryParams.length} `;
    clause = 'AND';
  }
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    query += `${clause} properties.cost_per_night >= $${queryParams.length} `;
    clause = 'AND';
  }
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    query += `${clause} properties.cost_per_night <= $${queryParams.length} `;
  }
  query += `GROUP BY properties.id `;

  if (options.minimum_rating) {
    clause = 'HAVING';
    queryParams.push(`${options.minimum_rating}`);
    query += `${clause} AVG(property_reviews.rating) >= $${queryParams.length} `;
  }

  query += `LIMIT $1;`;

  return db
    .query(query, queryParams)
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

  const queryParams = [
    property.title,
    property.description,
    property.owner_id,
    property.cover_photo_url,
    property.thumbnail_photo_url,
    property.cost_per_night,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.province,
    property.city,
    property.country,
    property.street,
    property.post_code
  ];

  const query = `INSERT INTO properties (
                  title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, TRUE, $10, $11, $12, $13, $14)
                  RETURNING *;`;

  return db
    .query(query, queryParams)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.error(err.message);
    });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
