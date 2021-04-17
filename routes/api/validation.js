const Joi = require('joi')

const schemaCreateContact = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(40)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

  phone: Joi.number()
    .integer()
    .min(10)
    .max(13)
    .required(),

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

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)
  if (error) {
    // const [{ message }] = error.details
    return next({
      status: 400,
      message: 'missing required name field'
    })
  }
  next()
}

module.exports.validCreateContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next)
}

module.exports.validUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
