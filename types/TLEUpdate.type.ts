/**
 * Represents a row in the TLE_LATEST table. Properties are defined in the same
 * order as the table columns.
 */
type TLEUpdate = {
    originator: string,
    objectName: string,
    objectId: string,
    refFrame: string,
    epoch: Date,
    eccentricity: number,
    inclination: number,
    raOfAscNode: number,
    argOfPericenter: number,
    meanAnomaly: number,
    classificationType: string,
    semimajorAxis: number,
    period: number,
    apoapsis: number,
    periapsis: number,
    countryCode: string,
    launchDate: Date,
    gpId: number,
    tleLine0: string,
    tleLine1: string,
    tleLine2: string
};

export default TLEUpdate;