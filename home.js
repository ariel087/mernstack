import express from 'express';
import { jWTToken } from './token.js'; // Ensure you import this function

const router = express.Router();

export const home = () => {
    router.post('/home', (req, res) => {
        const userId = req.body.userId;

        console.log("Received User ID:", userId); // Correct logging

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        try {
            const token = jWTToken(userId); // Assuming this function generates a token
            res.json({
                message: 'Token generated successfully',
                userId,
                token // Include the generated token in the response
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};
