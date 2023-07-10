import express, {Request, Response} from 'express';

const app = express()
const port = 3000

/**
 * Change once we connect this to the frontend
 */
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Space Watch server listening on port ${port}`)
})