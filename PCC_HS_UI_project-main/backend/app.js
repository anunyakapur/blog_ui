import * as staticData from './staticData.js';
import express from 'express';
import cors from 'cors';
import opn from 'opn';

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/blogs', (req, res) => {
    console.log("GET /blogs");
    return res.status(200).json(staticData.blogs);
});

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
        // Open the browser automatically
        opn(`http://localhost:${PORT}`);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});
