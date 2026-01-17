require('dotenv').config();

const credentials = {
    validUser: process.env.VALID_USER || 'standard_user',
    validPassword: process.env.VALID_PASSWORD || 'secret_sauce',
};  

module.exports = { credentials };