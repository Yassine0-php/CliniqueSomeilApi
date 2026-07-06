const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
require("dotenv").config();


// stocker les processus si tu veux éviter les doublons
let processAppli = null;
let processCpap = null;

router.get("/launch/appli", (req, res) => {
    if (!processAppli) {
        processAppli = spawn("python", ["-m", "streamlit", "run", process.env.PATH_RESULT_NUIT, "--server.port", "8501"]);
    }
    res.send("Appli launched");
});

router.get("/launch/cpap", (req, res) => {
    if (!processCpap) {
        processCpap = spawn("python", ["-m", "streamlit", "run", process.env.PATH_CPAP, "--server.port", "8502"]);
    }
    res.send("CPAP launched");
});

module.exports = router;