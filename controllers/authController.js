const { readData, writeData } = require('../utils/fileHandler');
const { generateToken } = require('../utils/tokenHandler');
const { hashPassword, verifyPassword } = require('../utils/passwordHandler');

const usersFile = './data/users.json';

exports.register = (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const users = readData(usersFile);
        console.log("first Users", users)

        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = hashPassword(password);
        users.push({ username, password: hashedPassword });
        console.log("Users::", users)

        writeData(usersFile, users);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.login = (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const users = readData(usersFile);

        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = verifyPassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(username);
        res.status(200).json({
             token,
             users
            });

            console.log("Token", token)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
