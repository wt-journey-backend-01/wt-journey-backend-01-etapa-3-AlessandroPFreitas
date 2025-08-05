const agentes = [
  {
    id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "1992-10-04",
    cargo: "delegado",
  },
];

function findAll() {
  return agentes;
}

function findId(id) {
  const agenteId = agentes.find((agente) => agente.id === id);
  return agenteId;
}

function createAgente(addAgente) {
  agentes.push(addAgente);
  return addAgente;
}

function attAgente(id, updateAgente) {
  const agenteIndex = agentes.findIndex((agente) => agente.id === id);

  if (agenteIndex === -1) {
    return undefined;
  }

  agentes[agenteIndex] = { ...agentes[agenteIndex], ...updateAgente };
  return agentes[agenteIndex];
}

function partialAgente(id, updateAgente) {
  const agenteIndex = agentes.findIndex((agente) => agente.id === id);

  if (agenteIndex === -1) {
    return undefined;
  }

  agentes[agenteIndex] = { ...agentes[agenteIndex], ...updateAgente };
  return agentes[agenteIndex];
}

function removeAgente(id) {
  const agenteIndex = agentes.findIndex((agente) => agente.id === id);

  if (agenteIndex === -1) {
    return undefined;
  }

  const agenteDeleted = agentes.splice(agenteIndex, 1);
  return agenteDeleted;
}

module.exports = {
  findAll,
  findId,
  createAgente,
  attAgente,
  partialAgente,
  removeAgente
};
