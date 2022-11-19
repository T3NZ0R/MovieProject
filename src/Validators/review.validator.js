import Joi from "joi";

export const ReviewValidator = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
        'string.empty': 'Username can not be empty',
        'string.min': 'Username can not includes less then 3 characters',
        'string.max': 'Username can not includes more then 30 characters',
        'string.alphanum': 'Username must only contain alpha or numeric characters',
        }),
    email: Joi.string()
        .email({tlds: {allow: false}})
        .required()
        .messages({
            'string.empty': 'Email can not be empty',
            'string.email': 'Email is not valid',
        }),
    content: Joi.string()
        .min(4)
        .max(1000)
        .required()
        .messages({
            'string.empty': 'Review can not be empty',
            'string.min': 'Review can not includes less then 3 characters',
            'string.max': 'Review can not includes more then 1000 characters',
        })
})
