import Joi from 'joi';

const claimSchema = Joi.object({
  description: Joi.string().required().min(20),
  reportId: Joi.number().required(),
  accountId: Joi.number().required(),
});

export {
  claimSchema,
};
