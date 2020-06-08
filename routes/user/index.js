const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user');
const ValidationMiddleware = require('../../middlewares/validation');

router.get('/', UserController.validadeList, UserController.list);
router.post('/', ValidationMiddleware(UserController.createSchema), UserController.create);
router.put('/:id', UserController.validadeUpdate, UserController.update);

router.get('/:id', UserController.validateFindOne, UserController.findOne);
router.delete('/:id', UserController.delete);


module.exports = router;