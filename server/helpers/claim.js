import Joi from 'joi';

const claimSchema = Joi.object({
  description: Joi.string().required().min(20),
  accountId: Joi.number().required(),
  reportId: Joi.number().required(),
});

export {
  claimSchema,
};
