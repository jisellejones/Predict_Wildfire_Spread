-- Creating tables for (NOAA & OR DoF) predict_wildfire_spreadDB
CREATE TABLE noaa_data(
	station VARCHAR(11) NOT NULL,
	name VARCHAR(40),
	county VARCHAR(20),
	latitude DEC(8,6),
	longitude DEC(9,6),
	elevation SMALLINT,
	date DATE,
	ACMC
	ACMH
	ACSC
	ACSH
	AWND SMALLINT,
	DAEV
	DAPR
	DASF
	DATN
	DATX
	DAWM
	DWPR
	EVAP
	FMTM
	FRGB
	FRGT
	FRTH
	GAHT
	MDEV
	MDPR
	MDSF
	MDTN
	MDTX
	MDWM
	MNPN
	MXPN	
	PRCP SMALLINT,
	PGTM
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

COPY noaa_data [(
	station,
	name,
	county)] 
	FROM 'Users\JohnPaul.Kivlin\Desktop\BootCamp\Predict_Wildfire_Spread\Resources\Baker 2008_2020 NOAA.csv' | STDIN 
	[[WITH] (FORMAT CSV, HEADER [TRUE], DELIMITER ',')];