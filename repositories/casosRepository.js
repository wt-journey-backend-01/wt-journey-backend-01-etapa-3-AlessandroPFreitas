const knex = require("../db/db");

async function findAll() {
  return await knex("casos").select("*");
}

async function findById(id) {
  return await knex("casos").where({ id }).first();
}

async function newCaso(caso) {
  const [newId] = await knex("casos").insert(caso).returning("id");
  return findById(newId);
}

async function attCaso(id, updateCaso) {
  const count = await knex("casos").where({ id }).update(updateCaso);
  if (count === 0) return undefined;
  return findById(id);
}

async function partialCaso(id, updateCaso) {
  const count = await knex("casos").where({ id }).update(updateCaso);
  if (count === 0) return undefined;
  return findById(id);
}

async function removeCaso(id) {
  const caso = await findById(id);
  if (!caso) return undefined;
  await knex("casos").where({ id }).del();
  return true;
}

module.exports = {
  findAll,
  findById,
  newCaso,
  attCaso,
  partialCaso,
  removeCaso,
};