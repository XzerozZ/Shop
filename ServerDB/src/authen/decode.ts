import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secret } from '../server';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: 'No token, authorization denied' });
            return false; 
        }
        const decoded = jwt.verify(token, secret);
        res.status(200).json({ message: 'have token', decoded});
        next();
    } catch (error) {
        console.log(error);
    }
};