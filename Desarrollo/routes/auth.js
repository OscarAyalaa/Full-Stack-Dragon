const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.json({ message: "Usuario registrado" });
    } catch (error) {
        res.status(500).json({ error: "Error registrando usuario" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) return res.status(400).json({ error: "Credenciales no validas" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ error: "Credenciales no validas" });

        const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Error logging " });
    }
});


const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Accesso denegado" });

    try {
        const verified = jwt.verify(token, "your_secret_key");
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};

module.exports = router;
