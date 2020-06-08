const Database = require('./lib/database');

async function createUserRoute(req, res){
  
};

function validateUser(req, res, next){
    const {name, email, password, avatar, roles} = req.body;
    if(name.length < 5){
        return res.status(418).send({message: 'Name should be bigger ...'});
    }
    if(!Array.isArray(roles)){
        return res.status(418).send({message: 'We need an Array here ...'});
    }

    req.body = {name, email, password, avatar, roles}

    return next();
}


function validateListUser(req,res,next){
    const {limit= 1, skip=0, orderBy='name', order=1} = req.query;

    if(Number.isNaN(limit) || Number.isNaN(skip)){
        res.status(418);
        throw new Error ('Limit and Skip should be a number');
    }
    if(limit < 1 || skip < 0){
        return res.status.send({message: 'Limit should be greater than 1 and skip should be at least 0'})
    }

    req.query.limit = Number(limit);
    req.query.skip = Number(skip);
    req.query.order = Number(order);
    req.query.orderBy = orderBy;

    return next();
}





module.exports = {
    createUserRoute,
    validateUser,
    listUserRoute,
    validateListUser,
    userDetailsRoute,
    updateUserRoute,
    userDeleteRoute
}