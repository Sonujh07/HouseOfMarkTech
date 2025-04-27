const fs = require('fs');

exports.readData = (path) => {
    try {
        if (!fs.existsSync(path)) {
            return [];
        }
        const data = fs.readFileSync(path);
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error('Read error:', error.message);
        return [];
    }
};

exports.writeData = (path, data) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Write error:', error.message);
    }
};
