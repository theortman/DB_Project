const joi = require('@hapi/joi');


const register_validation = (data) => {
    const schema = {
        name: joi.string().min(3).max(50).required(),
        lastName: joi.string().min(3).max(50).required(),
        DOB: joi.date().required(),
        gender: joi.string().max(1).min(1).required(),
        email: joi.string().required().email(),
        password: joi.string().min(8).max(1024).required(),
        phoneNo: joi.string().min(10).max(15).required(),
        street: joi.string().required(),
        city: joi.string().required(),
        state: joi.string().max(2).required(),
        zip: joi.string().required()
    };
    return joi.validate(data,schema);
};

const login_validation = (data) => {
    const schema = {
        email: joi.string().required().email(),
        password: joi.string().min(8).max(1024).required(),
    };
    return joi.validate(data,schema);
};

module.exports.register_validation = register_validation;
module.exports.login_validation = login_validation;

