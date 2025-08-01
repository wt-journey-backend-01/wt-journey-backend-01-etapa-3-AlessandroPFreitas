const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");
const { isValidUUID, generateUUID } = require("../utils/validation");

function getAllCasos(req, res) {
  const casos = casosRepository.findAll();
  res.json(casos);
}

function getCasoId(req, res) {
  const id = req.params.id;
  if (!isValidUUID(id)) {
    return res.status(400).json({
      mensagem: "ID inválido. O ID deve ser um UUID válido.",
    });
  }
  const caso = casosRepository.findById(id);
  if (!caso) {
    return res.status(404).json({ mensagem: "Caso não encontrado!" });
  }

  res.status(200).json(caso);
}

function postCaso(req, res) {
  const { titulo, descricao, status, agente_id } = req.body;

  if (!titulo || !descricao || !status || !agente_id) {
    return res
      .status(400)
      .json({ mensagem: "Todos os dados são obrigatorios!" });
  }

  // const agente = agentesRepository.findById(agente_id);
  // if (!agente) {
  //   return res.status(404).json({ mensagem: "Agente não encontrado!" });
  // }

  const statusPermitidos = ["aberto", "solucionado"];
  if (!statusPermitidos.includes(status)) {
    return res
      .status(400)
      .json({ mensagem: "Status deve ser 'aberto' ou 'solucionado'." });
  }

  const caso = {
    id: generateUUID(),
    titulo,
    descricao,
    status,
    agente_id,
  };
  casosRepository.newCaso(caso);

  res.status(201).json(caso);
}

function putCaso(req, res) {
  const { id } = req.params;
  const { titulo, descricao, status, agente_id } = req.body;

  if (!isValidUUID(id)) {
    return res.status(400).json({
      mensagem: "ID inválido. O ID deve ser um UUID válido.",
    });
  }

  if (!titulo || !descricao || !status || !agente_id) {
    return res
      .status(400)
      .json({ mensagem: "Todos os dados são obrigatorios!" });
  }

  const statusPermitidos = ["aberto", "solucionado"];
  if (!statusPermitidos.includes(status)) {
    return res
      .status(400)
      .json({ mensagem: "Status deve ser 'aberto' ou 'solucionado'." });
  }

  // const agente = agentesRepository.findById(agente_id);
  // if (!agente) {
  //   return res.status(404).json({ mensagem: "Agente não encontrado!" });
  // }

  const newCaso = {
    titulo,
    descricao,
    status,
    agente_id,
  };

  const casoAtt = casosRepository.attCaso(id, newCaso);
  
  // Verificar se o caso foi encontrado
  if (!casoAtt) {
    return res.status(404).json({ mensagem: "Caso não encontrado!" });
  }

  res.status(200).json(casoAtt);
}

function patchCaso(req, res) {
  const { id } = req.params;
  const { titulo, descricao, status, agente_id } = req.body;


  if (!isValidUUID(id)) {
    return res.status(400).json({
      mensagem: "ID inválido. O ID deve ser um UUID válido.",
    });
  }

  if (status && status !== "aberto" && status !== "solucionado") {
    return res
      .status(400)
      .json({ mensagem: "Status deve ser 'aberto' ou 'solucionado'." });
  }

  // if (agente_id) {
  //   const agente = agentesRepository.findById(agente_id);
  //   if (!agente) {
  //     return res.status(404).json({ mensagem: "Agente não encontrado!" });
  //   }
  // }

  const dadosParaAtualizar = {};

  if (titulo) {
    dadosParaAtualizar.titulo = titulo;
  }
  if (descricao) {
    dadosParaAtualizar.descricao = descricao;
  }
  if (status) {
    dadosParaAtualizar.status = status;
  }
  if (agente_id) {
    dadosParaAtualizar.agente_id = agente_id;
  }

  if (!titulo && !descricao && !status && !agente_id) {
    return res
      .status(400)
      .json({ mensagem: "Pelo menos um campo tem que ser enviado!" });
  }

  const casoAtualizado = casosRepository.partialCaso(id, dadosParaAtualizar);
  

  if (!casoAtualizado) {
    return res.status(404).json({ mensagem: "Caso não encontrado!" });
  }

  res.status(200).json(casoAtualizado);
}

function deleteCaso(req, res) {
  const { id } = req.params;
  if (!isValidUUID(id)) {
    return res.status(400).json({
      mensagem: "ID inválido. O ID deve ser um UUID válido.",
    });
  }

  const casoDeletado = casosRepository.removeCaso(id);
  if (!casoDeletado) {
    return res.status(404).json({ mensagem: "Caso não encontrado!" });
  }
  
  res.status(200).json({ mensagem: "Caso deletado com sucesso!", caso: casoDeletado });
}

module.exports = {
  getAllCasos,
  getCasoId,
  postCaso,
  putCaso,
  patchCaso,
  deleteCaso
};
