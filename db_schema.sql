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
SELECT w.fire_year, w.district, w.unit, w.fire_number, w.fire_name, w.legal, w.latitude, w.longitude, w.fuel_model, w.county, w.report_date, w.general_cause, w.odf_acres, w.total_acres,
n.prcp, n.snow, n.snwd, n.tmax, n.tmin
INTO fire_weather_data
FROM wildfire_data w
LEFT JOIN noaa_data n
ON w.report_date = n.date
AND  w.county = n.county


-- Filtered combined fire_weather_data for data bwtn start of 2008 to end of 2020
SELECT * 
INTO fire_weather_data_2008_2020
FROM fire_weather_data
WHERE report_date BETWEEN '2008-01-01' AND '2020-12-31'


--AVG by day for 5 selected weather conditions.  Step table to query for conditions @ 30/60/90 day intervals
SELECT n.county, n.date, AVG(prcp) AS prcp_avg_day, AVG(snow)AS snow_avg_day, AVG(snwd) AS snwd_avg_day, AVG(tmax)AS tmax_avg_day, AVG(tmin) AS tmin_avg_day 
INTO noaa_daily
FROM noaa_08to20 n
GROUP BY n.date, n.county
ORDER BY n.date, n.county


--Created avg columns for each fire and grouped by data and county from fire_weather_data_2008_2020
SELECT fire_year, district, unit, fire_number, fire_name, legal, latitude, longitude, fuel_model, county, report_date, general_cause, odf_acres, total_acres, 
AVG(prcp) AS prcp_avg, AVG(snow) AS snow_avg, AVG(snwd) AS snwd_avg, AVG(tmax) AS tmax_avg, AVG(tmin) AS tmin_avg  
INTO fw_combined_avgs
FROM fire_weather_data_2008_2020
GROUP BY fire_year, district, unit, fire_number, fire_name, legal, latitude, longitude, fuel_model, county, report_date, general_cause, odf_acres, total_acres
ORDER BY report_date, county


CREATE FUNCTION average_from_lastyear(START_DATE timestamp) 
	RETURNS FLOAT 
	LANGUAGE plpgsql
AS '
DECLARE
	average_value FLOAT;
BEGIN
		SELECT avg(n.prcp_avg_day) 
		INTO average_value
		FROM noaa_daily n
		WHERE n.date BETWEEN START_DATE - INTERVAL ''1 YEAR''AND START_DATE;
		RETURN average_value;
END;
';

--Used to create materialized view NAMED "fire_data_with_avg_weather" which contains the avg weather conditions for the month the fire took place
--Created by naming new materialized view as called out above, then inputting the below code in the definition section
 WITH month_avg AS (
         SELECT max(noaa_daily.county::text) AS county,
            max(date_trunc('month'::text, noaa_daily.date::timestamp with time zone)) AS year_month,
            avg(noaa_daily.prcp_avg_day) AS avg_prcp
           FROM noaa_daily
          GROUP BY noaa_daily.county, (date_trunc('month'::text, noaa_daily.date::timestamp with time zone))
        )
 SELECT 
    fw_comb.*,
    month_avg.avg_prcp, (SELECT "average_from_lastyear"(fw_comb.report_date) ) as prcp_avg_year
   FROM fw_combined_avgs fw_comb
     LEFT JOIN month_avg ON fw_comb.county::text = month_avg.county AND date_trunc('month'::text, fw_comb.report_date::timestamp with time zone) = month_avg.year_month;