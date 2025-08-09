const knex = require("../db/db");

async function findAll() {
  return await knex("agentes").select("*");
}

async function findId(id) {
  return await knex("agentes").where({ id }).first();
}

async function createAgente(agente) {
  await knex("agentes").insert(agente);
  return agente;
}

async function attAgente(id, updateAgente) {
  const count = await knex("agentes").where({ id }).update(updateAgente);
  if (count === 0) return undefined;
  return findId(id);
}

async function partialAgente(id, updateAgente) {
  const rollBacks = await knex("agentes").where({ id }).update(updateAgente);
  return rollBacks ? findId(id) : undefined;
}

async function removeAgente(id) {
  const agente = await findId(id);
  if (!agente) return undefined;

  await knex("agentes").where({ id }).del();
  return true;
}

module.exports = {
  findAll,
  findId,
  createAgente,
  attAgente,
  partialAgente,
  removeAgente,
};
