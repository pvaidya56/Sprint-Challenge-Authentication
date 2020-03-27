const db = require('../database/dbConfig.js');
require('dotenv').config();

module.exports = {
  findBy,
  findById,
  add
};

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users')
    .where({ id })
    .select('id', 'username')
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id');

  return findById(id);
}