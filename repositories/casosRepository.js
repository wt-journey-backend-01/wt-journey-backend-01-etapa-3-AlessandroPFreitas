const casos = [
  {
    id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
    titulo: "homicidio",
    descricao:
      "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
  },
];

function findAll() {
  return casos;
}

function findById(id) {
  return casos.find((caso) => caso.id === id);
}

function newCaso(caso) {
  const newCaso = casos.push(caso);
  return newCaso;
}

function attCaso(id, attCaso) {
  const casoIndex = casos.findIndex((caso) => caso.id === id);
  if (casoIndex === -1) {
    return undefined;
  }
  casos[casoIndex] = { ...casos[casoIndex], ...attCaso };

  return casos[casoIndex];
}

function partialCaso(id, attCaso) {
  const casoIndex = casos.findIndex((caso) => caso.id === id);

  if (casoIndex === -1) {
    return undefined;
  }

  casos[casoIndex] = { ...casos[casoIndex], ...attCaso };
  return casos[casoIndex];
}

function removeCaso(id) {
  const casoIndex = casos.findIndex((caso) => caso.id === id);
  if (casoIndex === -1) {
    return undefined;
  }

  const casoRemovido = casos.splice(casoIndex, 1);
  return casoRemovido;
}

module.exports = {
  findAll,
  findById,
  newCaso,
  attCaso,
  partialCaso,
  removeCaso
};
