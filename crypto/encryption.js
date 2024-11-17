const crypto = require('crypto');

function encryptPassword(password) {
    const ITERATIONS = 1000;
    const KEY_LENGTH = 64;
    const encryptedPassword = crypto.pbkdf2Sync(password, '', ITERATIONS, KEY_LENGTH, 'sha256');
    return (encryptedPassword.toString('base64'));
}

module.exports = {encryptPassword};
