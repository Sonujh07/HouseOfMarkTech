const crypto = require('crypto');
require('dotenv').config()

const SECRET = process.env.SECRET;

exports.hashPassword = (password) => {
    return crypto.createHmac('sha256', SECRET).update(password).digest('hex');
};

exports.verifyPassword = (password, hashedPassword) => {
    const passwordHash = crypto.createHmac('sha256', SECRET).update(password).digest('hex');
    return passwordHash === hashedPassword;
};
