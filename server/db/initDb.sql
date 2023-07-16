-- note: numeric type leads to slow calculations
CREATE TABLE IF NOT EXISTS tle_updates (
    ORIGINATOR varchar(20),
    OBJECT_NAME varchar(50),
    OBJECT_ID varchar(20),
    REF_FRAME varchar(10),
    EPOCH timestamp,
    ECCENTRICITY numeric,
    INCLINATION numeric,
    RA_OF_ASC_NODE numeric,
    ARG_OF_PERICENTER numeric,
    MEAN_ANOMALY numeric,
    CLASSIFICATION_TYPE char(1),
    SEMIMAJOR_AXIS numeric,
    PERIOD numeric,
    APOAPSIS numeric,
    PERIAPSIS numeric,
    COUNTRY_CODE varchar(5),
    LAUNCH_DATE date,
    GP_ID integer PRIMARY KEY,
    TLE_LINE0 varchar(24),
    TLE_LINE1 varchar(69),
    TLE_LINE2 varchar(69)
);
