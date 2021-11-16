--Creation of noaa_data schema
CREATE TABLE noaa_data(
station VARCHAR(11) NOT NULL,
	name VARCHAR(40),
	county VARCHAR(20),
	latitude DEC(8,6),
	longitude DEC(9,6),
	elevation DEC,
	date DATE,
    AWND INT, 
    DAPR INT, 
    FMTM INT,  
    MDPR INT, 
    PGTM INT,
    PRCP INT, 
    SNOW INT, 
    SNWD INT,
    TAVG INT, 
    TMAX INT, 
    TMIN INT, 
    TOBS INT, 
    WDF2 INT, 
    WDF5 INT, 
    WESD INT, 
    WESF INT, 
    WSF2 INT,
    WSF5 INT, 
    WT01 INT, 
    WT02 INT, 
    WT03 INT, 
    WT05 INT, 
    WT06 INT, 
    WT07 INT, 
    WT08 INT, 
    WT09 INT,
    WT11 INT, 
    WT13 INT, 
    WT16 INT, 
    WT17 INT, 
    WT18 INT, 
    WT19 INT, 
    WT22 INT, 
    EVAP INT, 
    MNPN INT,
    MXPN INT, 
    SN31 INT, 
    SN32 INT, 
    SN33 INT, 
    SN35 INT, 
    SX31 INT, 
    SX32 INT, 
    SX33 INT, 
    SX35 INT,
    SX36 INT, 
    WDMV INT, 
    PSUN INT, 
    TSUN INT, 
    MDSF INT, 
    WT04 INT, 
    WT10 INT, 
    SN52 INT, 
    SX52 INT, 
    DASF INT
);

--Import of noaa_data
COPY noaa_data(Optional Columns)
FROM [Absolute Path to File]
DELIMITER , CSV [HEADER];

--Creation of wildfire_data schema
CREATE TABLE wildfire_data(
    fire_year INT,
    district VARCHAR,
    unit VARCHAR,
    fire_number VARCHAR,
    fire_name VARCHAR,
    legal VARCHAR,
    latitude VARCHAR,
    longitude VARCHAR,
    fuel_model VARCHAR,
    county VARCHAR,
    report_date DATE,
    general_cause VARCHAR,
    odf_acres DEC,
    total_acres DEC
);

-- Joined wildfire_data with noaa_data on county and data only keeping prcp/snow/snwd/tmax/tmin from noaa_data.  Created new table fire_weather_data
SELECT w.fire_year, w.district, w.unit, w.fire_number, w.fire_name, w.legal, w.latitude, w.fuel_model, w.county, w.report_date, w.general_cause, w.odf_acres, w.total_acres,
n.prcp, n.snow, n.snwd, n.tmax, n.tmin
INTO fire_weather_data
FROM wildfire_data w
LEFT JOIN noaa_data n
ON w.report_date = n.date
AND  w.county = n.county




--Created avg columns for each fire and grouped by data and county from fire_weather_data_2008_2020
SELECT fire_year, district, unit, fire_number, fire_name, legal, latitude, fuel_model, county, report_date, general_cause, odf_acres, total_acres, 
AVG(prcp) AS prcp_avg, AVG(snow) AS snow_avg, AVG(snwd) AS snwd_avg, AVG(tmax) AS tmax_avg, AVG(tmin) AS tmin_avg  
INTO fw_combined_avgs
FROM fire_weather_data_2008_2020
GROUP BY fire_year, district, unit, fire_number, fire_name, legal, latitude, fuel_model, county, report_date, general_cause, odf_acres, total_acres
ORDER BY report_date, county

