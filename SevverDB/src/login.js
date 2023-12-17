const { Request, Response } = require('express');
const { connectToDatabase } = require('./src/database');
import jwt from "jsonwebtoken";
const { hashPassword,matchPassword } = require('./src/hash');


const login = async (req, res) => {
    try {
        const connection = await connectToDatabase();
        await connection.beginTransaction();
        const { email, password } = req.body;
        const [rows] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);
        if (rows.length === 0) {
            res.status(400).json({ message: 'email not found' });
            return;
        }
        const user = rows[0];
        const MatchPassword = await matchPassword(password, user.password);
        if (!MatchPassword) {
            res.status(400).json({ message: 'password not match' });
            return;
        }
        const payload = { id: user.id, role: user.role };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'login success', result: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' });
    }
};

const changePassword = async (req, res) => {
    try {
        await Database();
        const { email, newPassword } = req.body;
        const [rows] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);
        if (rows.length === 0) {
            res.send("No User found");
            return;
        }
        const user = rows[0];
        const MatchPassword = await matchPassword(newPassword, user.password);
        if (MatchPassword) {
            res.send("Password is the same");
            return;
        }
        const hash = await hashPassword(newPassword);
        await connection.query('UPDATE user SET password = ? WHERE email = ?', [hash, email]);
        await connection.commit();
        res.status(200).send("Change Password Success");
    } catch (error) {
        console.error("Error during password change", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { login, changePassword };