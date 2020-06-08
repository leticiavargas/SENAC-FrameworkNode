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

    async create(){
        const {insertedId} = await User.createOne(req.body);
        res.send({insertedId});
    }

    async update(req, res){
        const {id} = req.params;
        const {name, email, password, avatar, roles} = req.body;
        const result = await User.updateOne({_id: id}, [{ $set: {name, email, password, avatar, roles}}] );
        if(!result){
            return res.status(404).send();
        }
        res.send(result);
    }

    async findOne(req, res){
        const {id} = req.params;
        const user = await User.findOne({_id: id});
        if(!user){
           return res.status(404).send();
        }
        res.send(user);
    }

    async delete(req, res){
        const {id} = req.params;
        const result = await User.deleteOne({_id: id});
        res.send({});
    }
}

module.exports = new UserController();