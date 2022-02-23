import Joi from 'joi';

const accountSchema = Joi.object({
  email: Joi.string().required().email(),
  phone: Joi.string().required().max(20),
  firstName: Joi.string().required().max(45),
  lastName: Joi.string().required().max(45),
  password: Joi.string().required().alphanum(),
});

export {
  accountSchema,
};
