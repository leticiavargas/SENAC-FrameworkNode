const Joi = require('joi');
const User = require('../models/user');

class UserController {

    async list(req, res){
        const {limit, skip, orderBy, order} = req.query;
        const sort = {};
        sort[orderBy] = order;
        const users = await User.find(limit, skip, sort);
        res.send(users);
    }

    get createSchema() {
        return Joi.object({
            name: Joi.string().min(5).max(100).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(4).max(100).required(),
            avatar: Joi.string().min(4).max(299).default('default.jpg'),
            roles: Joi.array().items(Joi.string().allow('admin', 'default')).required()
        });
      }

    async create(req, res){
        const {insertedId} = await User.createOne(req.body);
        res.send({insertedId});
    }

    async update(req, res){
        const {id} = req.params;
        const result = await User.updateOne(id, req.body);
        if(!result){
            return res.status(404).send();
        }
        res.send(result);
    }

    async findOne(req, res){
        const {id} = req.params;
        const user = await User.findOne(id);
        if(!user){
           return res.status(404).send();
        }
        res.send(user);
    }

    async delete(req, res){
        const {id} = req.params;
        const result = await User.deleteOne(id);
        if(!result.deletedCount){
            return res.status(404).send();
         }
        res.send(result);
    }
}

module.exports = new UserController();