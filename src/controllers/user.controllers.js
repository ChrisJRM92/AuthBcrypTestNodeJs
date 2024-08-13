const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const pass = req.body.password;
    const hashPass = await bcrypt.hash(pass, 10);
    const result = await User.create({...req.body, password: hashPass});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.send("Usuario eliminado correctamente").sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    delete req.body.password;
    delete req.body.email;
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

//Login publico
const login = catchError(async(req, res)=>{
    const {email, password} = req.body;
    
    const user = await User.findOne({where: {email: email}})
    if (!user) return res.status(401).json({"message": "Credenciales incorrectas"})
    
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.status(401).json({"message": "Credenciales incorrectas"})
    
    const token = jwt.sign({user}, process.env.TOKEN, {expiresIn: '1d'})
    return res.status(200).json({user: user, token: token})
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}