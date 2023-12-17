const { Request, Response } = require('express');
const { connectToDatabase } = require('./database');
const { hashPassword } = require('../hash');

const signup = async (req, res) => {
    try {
        const connection = await connectToDatabase();
        await connection.beginTransaction();

        const { username, email, password } = req.body;

        try {
            // Check if email already exists
            const [rows] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);

            if (rows.length === 0) {
                // Email doesn't exist, proceed with signup
                const hashedPassword = await hashPassword(password);

                await connection.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

                await connection.commit();

                res.status(200).send({ user: { username, email } });
            } else {
                // Email already exists
                res.status(400).send({ message: 'User with this email already exists' });
            }
        } finally {
            await connection.release();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

module.exports = { signup };