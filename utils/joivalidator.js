const Joi = require('joi')
const postSchema = Joi.object({
    title: Joi.string().min(3).max(10).required(),
    description: Joi.string().min(3).max(20).required(),
    status: Joi.string().min(3).max(10).required()
});
const updatePostSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(3).max(200),
    status: Joi.string().min(3).max(10)
});
module.exports ={postSchema,updatePostSchema}