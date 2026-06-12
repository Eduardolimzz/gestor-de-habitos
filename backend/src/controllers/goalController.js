const { makeGoalService } = require('../factories/goalFactory');
 
// ─── GET /goals ─────────────────────────────────────────────────────────────
async function list(req, res) {
  try {
    const service = makeGoalService();
    const goals = await service.list(req.user.id);
    return res.status(200).json({ goals });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}
 
// ─── GET /goals/:id ──────────────────────────────────────────────────────────
async function getById(req, res) {
  try {
    const service = makeGoalService();
    const goal = await service.getById(req.params.id, req.user.id);
    return res.status(200).json({ goal });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}
 
// ─── POST /goals ─────────────────────────────────────────────────────────────
async function create(req, res) {
  try {
    const service = makeGoalService();
    const goal = await service.create(req.user.id, req.body);
    return res.status(201).json({ message: 'Meta criada com sucesso', goal });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}
 
// ─── PUT /goals/:id ──────────────────────────────────────────────────────────
async function update(req, res) {
  try {
    const service = makeGoalService();
    const goal = await service.update(req.params.id, req.user.id, req.body);
    return res.status(200).json({ message: 'Meta atualizada com sucesso', goal });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}
 
// ─── DELETE /goals/:id ───────────────────────────────────────────────────────
async function remove(req, res) {
  try {
    const service = makeGoalService();
    await service.delete(req.params.id, req.user.id);
    return res.status(200).json({ message: 'Meta removida com sucesso' });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}
 
module.exports = { list, getById, create, update, remove };
