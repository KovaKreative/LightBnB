const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
};