const express = require("express");
const cors = require("cors");
const  axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api/characteres", async (req, res) => {
    try{
        const response = await axios.get("https://dragonball-api.com/api/characters");
        res.json(response.data);
    } catch (error){
        res.status(500).json({ message: "Error encontrando characters", error})
    }
});


app.get("/api/characteres/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const response = await axios.get("https://dragonball-api.com/api/characters/"+id);
        res.json(response.data);
    } catch (error){
        res.status(500).json({ message: `Error encontrando characters con el id: ${id}`, error})
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

const mongoose = require("mongoose");

//conexion MongoDB
mongoose.connect("mongodb://localhost:27017/dragonball").then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));


const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);