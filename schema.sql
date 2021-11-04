-- Creating tables for (NOAA & OR DoF) predict_wildfire_spreadDB
CREATE TABLE noaa_data(
	station VARCHAR(11) NOT NULL,
	name VARCHAR(40),
	county VARCHAR(20),
	latitude DEC(8,6),
	longitude DEC(9,6),
	elevation SMALLINT,
	date DATE,
	AWND SMALLINT,
	PRCP SMALLINT,
	PSUN SMALLINT,
	SNOW SMALLINT,
	SNWD SMALLINT,
	TAVG SMALLINT,
	TMAX SMALLINT,
	TMIN SMALLINT,
	WT07 SMALLINT,
	WT08 SMALLINT,
	PRIMARY KEY (county)
);