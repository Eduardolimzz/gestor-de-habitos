const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const goalController = require('../controllers/goalController');
 
const router = Router();
 
// Aplica authMiddleware em todas as rotas deste router
router.use(authMiddleware);
 
router.get('/',     goalController.list);
router.get('/:id',  goalController.getById);
router.post('/',    goalController.create);
router.put('/:id',  goalController.update);
router.delete('/:id', goalController.remove);
 
module.exports = router;
 