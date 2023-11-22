const Joi = require("joi");

const addMovieSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "any.required": "you should provide title!!",
  }),
});

module.exports = {
  addMovieSchema,
};
