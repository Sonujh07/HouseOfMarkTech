require('dotenv').config()

const SECRET = process.env.SECRET;

exports.generateToken = (username) => {
    return Buffer.from(`${username}:${SECRET}`).toString('base64');
};

exports.verifyToken = (token) => {
    try {
        const decoded = Buffer.from(token, 'base64').toString('ascii');
        const [username, secret] = decoded.split(':');
        if (secret !== SECRET) {
            return null;
        }
        return username;
    } catch (error) {
        return null;
    }
};
