import 'dotenv/config';
import express, { Express, Request, Response as ExpressResponse } from 'express';
import TEST_DATA from '../data/gp_subset.json';

const app: Express = express();
const port = 3000;

/**
 * Change once we connect this to the frontend
 */
app.get('/', (_req: Request, res: ExpressResponse) => {
  res.send('Hello World!')
});

app.get('/test-fetch', async (_req: Request, res: ExpressResponse) => {
  const username = process.env.SPACE_TRACK_USER;
  const password = process.env.SPACE_TRACK_PASS;
  // const loginRes: Response = await fetch(`https://www.space-track.org/ajaxauth/login`, {
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   },
  //   body: `identity=${username}&password=${password}&query=https://www.space-track.org/basicspacedata/query/class/gp/orderby/CCSDS_OMM_VERS%20asc/limit/10/emptyresult/show`
  // });
  // const queryData: any = await loginRes.json();
  const queryData = TEST_DATA;
  res.send(queryData);
});

app.listen(port, () => {
  console.log(`Space Watch server listening on port ${port}`)
});