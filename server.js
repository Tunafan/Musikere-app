import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());



app.get('/musikere/db', async (req, res) => {
    const data = await fs.readFile('db/musicians.json');
    const artists = JSON.parse(data);
    res.json(artists);
});





const port = 1312;
app.listen(port, () => {
    console.log(`Serveren kører på http://localhost:${port} - min fødselsdato :-)`);
})