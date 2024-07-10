import Joi from 'joi';

export const companySchema = Joi.object({
    companyName: Joi.string(),
    description: Joi.string(),
    industry: Joi.string(),
    address: Joi.string(),
    numberOfEmployees: Joi.string().valid(
        '1-10',
        '11-20',
        '21-50',
        '51-100',
        '101-200',
        '201-500',
        '501-1000',
        '1001-5000',
        '5001-10000',
        '10001+'
    ),
    companyEmail: Joi.string().email(),
    companyHR: Joi.string() // assuming this is an ObjectId in string format
});

export const addCompanySchema = companySchema.fork(
    ['companyName', 'description', 'industry', 'address', 'numberOfEmployees', 'companyEmail', 'companyHR'],
    (schema) => schema.required()
);
export const updateCompanySchema = companySchema;
