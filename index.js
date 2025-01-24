import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { jWTToken } from "./token.js";
import { home } from "./home.js";

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.post('/login', (req, res) => {
    const userId = req.body.userId;
    
    console.log("Received User ID:", userId); // Added console.log for userId

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const token = jWTToken(res, userId);
        res.json({ 
            message: 'Token generated successfully', 
            userId 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
home()