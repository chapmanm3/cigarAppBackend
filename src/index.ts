import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { addCigarHandler, deleteCigarHandler, getAllCigarsHandler, getCigarDetailsHandler, updateCigarHandler } from './handlers/cigars';
import { addHumidorHandler, getHumidorsHandler } from './handlers/humidors';
import { authMiddleware } from './middleware/authMiddleware';


const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors())
app.use(authMiddleware)

app.get('/cigars', (req, res) => getAllCigarsHandler(req, res));

app.get('/cigar/:cigarId', (req, res) => getCigarDetailsHandler(req, res));

app.delete('/cigar/:cigarId', (req, res) => deleteCigarHandler(req, res));

app.post('/cigar/:cigarId', (req, res) => updateCigarHandler(req, res))

app.post('/createCigar', (req, res) => addCigarHandler(req, res))

app.get('/humidors', (req, res) => getHumidorsHandler(req, res))

app.post('/createHumidor', (req, res) => addHumidorHandler(req, res))

app.get('/healthCheck', (req, res) => {
  res.sendStatus(200)
})

if (require.main === module) {
  app.listen(port, () => {
    console.log(`cigarApp backend listening on port ${port}`)
  });
}

export { app }
