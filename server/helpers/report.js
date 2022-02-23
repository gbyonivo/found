import Joi from 'joi';

const reportSchema = Joi.object({
  itemName: Joi.string().required().min(5),
  accountId: Joi.number().required(),
});

export {
  reportSchema,
};
