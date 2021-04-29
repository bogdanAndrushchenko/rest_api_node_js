const Joi = require('joi')

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(40).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.number().integer().min(10).required(),
  favorite: Joi.boolean().optional(),

})

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(40)
    .optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),

  phone: Joi.number()
    .integer()
    .min(10)
    .max(13)
    .optional(),

})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    console.log(err)
    next({
      status: 400,
      message: err.message.replace(/"/g, "'"),
    })
  }
}

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
})

module.exports = {
  validCreateContact: async (req, res, next) => {
    return await validate(schemaCreateContact, req.body, next)
  },
  validUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next)
  },
  validUpdateStatusContact: (req, res, next) => {
    return validate(schemaUpdateStatusContact, req.body, next)
  },

}
