const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const ValidationMiddleware = require('../middlewares/validation');

router.get('/', UserController.list);
router.post('/', ValidationMiddleware(UserController.createSchema), UserController.create);
router.put('/:id', UserController.update);
router.get('/:id', UserController.findOne);
router.delete('/:id', UserController.delete);


module.exports = router;