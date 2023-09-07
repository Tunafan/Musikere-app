import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.get('/',  (req, res) => {
  
    res.json("lol");
});

app.get('/musikere/backend/db', async (req, res) => {
    const data = await fs.readFile('./backend/db/musicians.json');
    const artists = JSON.parse(data);
    res.json(artists);
});

app.post('/musikere/backend/db', async (req, res) => {
    // get new artist request
        const newMusician = req.body;
        newMusician.id = new Date().getTime();

    // get artist
        const data = await fs.readFile('db/musicians.json');
        const musicians = JSON.parse(data);
        musicians.push(newArtist);

    // opdater original fil
        await fs.writeFile('db/musicians.json', JSON.stringify(musicians, null, 2));
        res.json(musicians);
});

app.put('/backend/db/:id', async (req,res) => {
    // get ID to update and what to update with
        const musicianId = Number(req.params.id);
        const musicianArtistData = req.body;  

    // read existing data
        const data = await fs.readFile('db/musicians.json');
        const musicians = JSON.parse(data);

    // find artist index to match ID
        const musicianToUpdate =  musiciains.find(musician => musician.id === musicianId);

        for(const key in musicianToUpdate) {
            if(key !== 'id'){
                musicianToUpdate[key] = updatedMusicianData[key]
            }
        };

    // update the data file with the new data
        await fs.writeFile('db/musicians.json', JSON.stringify(musicians, null, 2));

    // response
        res.json(musicians);
});

app.delete('/backend/db/:id', async (req, res) => {
    // get artistID to delete
        const musicianId = Number(req.params.id);

    // read the data file
        const data = await fs.readFile('db/musicians.json');
        const musicians = JSON.parse(data);

    // find artist index to match ID
        const results =  musicians.filter(a => a.id !==musicianId);

    // update the json file
        await fs.writeFile('db/musicians.json', JSON.stringify(results, null, 2))

        res.json(results);
})

const port = 1312;
app.listen(port, () => {
    console.log(`Serveren kører på http://localhost:${port} - min fødselsdato :-)`);
})