import 'dotenv/config';
import express, { Express, Request, Response as ExpressResponse } from 'express';
import * as db from './db';
import { TLEUpdate } from '../types';
import TEST_DATA from '../data/gp_subset.json';
import { PoolClient } from 'pg';

const app: Express = express();
const port = 3000;

/**
 * TODO: Change once we connect this to the frontend
 */
app.get('/', (_req: Request, res: ExpressResponse) => {
  res.send('Hello World!')
});

/**
 * TODO: Change to post request once we get front end set up
 */
app.get('/update-db', async (_req: Request, res: ExpressResponse) => {
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
  const dbClient: PoolClient = await db.getClient();
  dbClient.query('BEGIN');
  let success = true;
  try {
    for (const tleUpdate of queryData) {
      const formattedTleUpdate: TLEUpdate = {
        originator: tleUpdate.ORIGINATOR,
        objectName: tleUpdate.OBJECT_NAME,
        objectId: tleUpdate.OBJECT_ID,
        refFrame: tleUpdate.REF_FRAME,
        epoch: new Date(Date.parse(tleUpdate.EPOCH + 'Z')),
        eccentricity: Number(tleUpdate.ECCENTRICITY),
        inclination: Number(tleUpdate.INCLINATION),
        raOfAscNode: Number(tleUpdate.RA_OF_ASC_NODE),
        argOfPericenter: Number(tleUpdate.ARG_OF_PERICENTER),
        meanAnomaly: Number(tleUpdate.MEAN_ANOMALY),
        classificationType: tleUpdate.CLASSIFICATION_TYPE,
        semimajorAxis: Number(tleUpdate.SEMIMAJOR_AXIS),
        period: Number(tleUpdate.PERIOD),
        apoapsis: Number(tleUpdate.APOAPSIS),
        periapsis: Number(tleUpdate.PERIAPSIS),
        countryCode: tleUpdate.COUNTRY_CODE,
        launchDate: new Date(2000, 0, 1), //tleUpdate.LAUNCH_DATE,
        gpId: Number(tleUpdate.GP_ID),
        tleLine0: tleUpdate.TLE_LINE0,
        tleLine1: tleUpdate.TLE_LINE1,
        tleLine2: tleUpdate.TLE_LINE2
      }
      await db.query(
        'INSERT INTO tle_updates VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)',
        Object.values(formattedTleUpdate)
      );
    };
  } catch (e) {
    dbClient.query('ROLLBACK');
    success = false;
    console.log(e);
  } finally {
    dbClient.release();
  }

  if (success) {
    dbClient.query('COMMIT');
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Space Watch server listening on port ${port}`)
});