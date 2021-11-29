# Predict_Wildfire_Spread

## Presentation Link (still in draft form)

[Presentation](https://docs.google.com/presentation/d/1plyPo9EvBSwDRBLmRfiiLZi264RDhYacvXQldgWzTLU/edit#slide=id.p)

## Dashboard Link

[Wildfire Website Deployment](https://wildfirepredict.herokuapp.com/)

## Outline of Project

### Project Overview - Predict Wildfire Spread

The purpose of this project is to try to predict where and how quickly a wildfire will spread based on
- fuel type
- weather patterns (wind, temperature, precipitation, drought conditions, . . .)
- location
- accessibility
- geography

### Main Question

Can the severity of a wildfire be predicted based on geographic and weather data? 

### Reason for topic selection

- Wildfires have seemed to be increasing over time in both frequency and intensity. These wildfires impact the lives of humans and animals in surrounding cities and states. The massive loss of forest and greenery may also accelerate the impacts of climate change. If we can predict the location, size, and spread of a wildfire, we may be able to decrease the amount of natural life lost.

### Dashboard / Data Story Outline

 - Fires in OR seem to be increasing in fluency each year
 - Fires also seem to be increasing in intensity 
    - Visualization showing increasing intensity? (1990 - 2001)
    - Visual of map showing years and intensity? (1990 - 2001)
- Effects of wildfires
 	- Oregon 2020 statistics:
        - Structures destroyed 300+ 
        - Deaths 11 deaths in 2020
        - Area Burned in 2020 1.2 Million Acres (GlobalForestWatch.Org)
- What causes wildfires
	- Human causes
    - Natural causes
    - Weather
- Which of these have the greatest impact on fire severity?
    - Visualization of Random Forest Weighted Table
- Can we predict the severity of a Wildfire based on 4 factors mentioned above?
    - For each ML model show a dashboard of the  following
        - Graph showing severity number
        - Visualization of map with actual acres burned
            - Colors = severity
            - Size = acreage
            - Popups
        - Table showing accuracy
        - Give user ability to choose fire year & severity?

### Exploratory Data Analysis
Two data sources were used in analysis.  Prior to using these data sources, the following steps were taken to explore/clean the data:

#### Exploring Fire Data

See [Exploratory_Data_Analysis file](https://github.com/jisellejones/Predict_Wildfire_Spread/blob/main/Exploratory_Data_Analysis.ipynb)

We considered and created visualizations for:

- Fire data over time
- Counties vs number of fires & counties vs total acres
- Statistics of total acres burned grouped by fuel type

#### Cleaning Data

    - Time periods were reviewed to ensure they matched between sources.  The fire data was filtered to match the time periods of the weather data [Fire Year Filter](database_schema_code_ERD/fire_date_filter.png)
    - The fire data general cause was reviewed and values transformed into 3 categories [Gernal Cause](database_schema_code_ERD/cause_count.png) , [Categories](database_schema_code_ERD/categories.png)
    - Dropped null columns from data [Drop Code]((database_schema_code_ERD/drop_null.png)
    - Dropped all columns from the weather data except for the 5 core categories as tracked by noaa.  [5 Core Values](database_schema_code_ERD/core_values.png)
        - Other values were not include due to the high number of null values.  Inclusion would have significantly reduced the amount of useable data for the machine learning analysis

### Database & Data Sources

-  Data Sources:
    - [NOAA Documentation](https://www1.ncdc.noaa.gov/pub/data/cdo/documentation/GHCND_documentation.pdf)
    - [Weather Data - Noaa Search Tool](https://www.ncdc.noaa.gov/cdo-web/search?datasetid=GHCND)
    - [Oregon Wildfire Data](https://apps.odf.oregon.gov/DIVISIONS/protection/fire_protection/fires/FIRESlist.asp)

[Database Schema with Join](db_schema.sql)
- [Database Join Code](database_schema_code_ERD/db_join_code.png)

-  Data Files on Heroku:
    -  wildfire_data
        - Data from the Oregon Department of Forestry with data from 1990 to 2021 
    -  noaa_data
        -  Weather data from the National Oceanic and Atmospheric Administration(NOAA) from 2008 to 2020
    - To connect with data
        - Step 1: If using local server install psycopg2
            - If using Google Colab, this first step is unnecessary
        - Step 2: In file: import psycopg2 as pg
        - Step 3: Use the following code - replace [table] is either wildfire_data or noaa_data
            - engine = pg.connect("dbname='d3r8dfuncb78iv' user='jrufhfiejfajri' host='ec2-52-200-155-213.compute-1.amazonaws.com' port='5432' password='9a7254d2151b5e3c280fe275dbba039acdc9190fbc167f64c564c449ca77af88'")
            - noaa_df = pd.read_sql('select * from [table]', con=engine)    

### Software/Languages:
 - PostgresSQL
 - Python 3.7
 - VSCode 1.62.0
 - PGAdmin 5.2
 - Heroku
 - Scikit learn
 - ML: Random Forest Classifier
 - ML: SMOTEEN
 - Java Script
 - JSON
 - HTML
 - Leaflet

# Machine Learning Models

## Machine Learning Model - ML_Simple (Provisional Model)

### Feature Enineering (Target):

To predict fire severity, the total acres a fire consumed was binned into 5 levels of severity.  
-  Class 1 - 10 acres or less;
-  Class 2 - 10 acres or more,, but less than 100 acres;
-  Class 3 - 100 acres or more, but less than 1000 acres;
-  Class 4 - 1000 acres or more, but less than 10,000 acres;
-  Class 5 - 10,000 acres or more.

With the initial class sizes, we could determine a large skew in the Class 1 fires.

-  Class 1 - 31989
-  Class 2 - 1131
-  Class 3 - 404
-  Class 4 - 135
-  Class 5 - 96

### Feature Enineering (Features): 
From the Oregon Department of Forestry dataset (1990 - 2021) we used General Cause, Fire Year, Latitude, Longitude, and Fuel Model.

### Machine Learning Model:
We choose to start with Random Forest Classifier for two reasons:

1.  Ability to rank features by importance.
2.  Predict outcomes based on our testing features.

### Results:

<img width="483" alt="Screen Shot 2021-11-22 at 10 36 29 PM" src="https://user-images.githubusercontent.com/691355/142980342-82f02fac-5eb5-4173-a2f8-c4a30a2443b3.png">

### Limitations:
RFC does great with classification but not regression.  The model would have a difficult time with precise and continous predictions.  There is also a high chance the trees have there own condtions, such as:
-  Class Imbalance
-  Sample Duplicatiom
-  Overfitting
-  Node Splitting 

## Machine Learning Model - ML_Fire

### ETL:
To match our future weather features merge, the years for the fire data were adjusted to 2008 - 2020.

### Feature Engineering Changes(Target):  
For our target, we determined there was value in following a recognized fire classification system.  The levels were changed to match how the National Wildfire Coordinating Group classifies fires. https://www.nwcg.gov/term/glossary/size-class-of-fire.  After running the model with the changed class sizes, we saw a decrease in accuracy across the model.  Therefore, the class sizes were adjusted to follow a 3 class system from USDA Forest Service: https://www.fs.fed.us/nwacfire/home/terminology.html.

### Fire Classes - National Wildfire Coordinating Group vs USDA Forest Service 

### National Wildfire Coordinating Group

-  Class 1 - one-fourth acre or less;
-  Class 2 - more than one-fourth acre, but less than 10 acres;
-  Class 3 - 10 acres or more, but less than 100 acres;
-  Class 4 - 100 acres or more, but less than 300 acres;
-  Class 5 - 300 acres or more, but less than 1,000 acres;
-  Class 6 - 1,000 acres or more, but less than 5,000 acres;
-  Class 7 - 5,000 acres or more.

With the class sizes, there is still a large skew in the Class 1 fires.

-  Class 1 - 8947
-  Class 2 - 2805
-  Class 3 - 478
-  Class 4 - 101
-  Class 5 - 56
-  Class 6 - 47
-  Class 7 - 70

### USDA Forest Service 

-  Class 1 - one-fourth acre or less;
-  Class 2 - more than one-fourth acre, but less than 300 acres;
-  Class 7 - 300 acres or more.

There is still a large skew in class 1 but slight balance added to class 2 and class 3.

-  Class 1 - 8947
-  Class 2 - 3384
-  Class 3 - 173

### Feature Enineering Changes (Features):
-  Date range adjusted to 2008 - 2020
-  General cause binned into 3 categories; human, nature, undetermined/misc

### Machine Learning Model:  
To account for our overfitting with class 1 fires, another ML was created for Combination Sampling With SMOTEENN.

### Results (RFC):

<img width="452" alt="Screen Shot 2021-11-22 at 10 39 20 PM" src="https://user-images.githubusercontent.com/691355/142980528-66098550-5d43-481f-be8b-beb8bc8a850a.png">

### Results (SMOTEENN)

<img width="638" alt="Screen Shot 2021-11-22 at 10 40 35 PM" src="https://user-images.githubusercontent.com/691355/142980623-9b17ca48-15f0-4462-a474-d572b0403031.png">


## Machine Learning Model - ML_fireandweather

### ETL:
To prepare the ML models with the new weather data ETL was performed to drop all rows with null values.
-  Removing null values dropped total rows from 12,577 to 10,048.

### Feature Enineering Changes (Target): None

### Feature Enineering Changes (Features):  
Added new rows containing weather data to the model.
- Temperature Min AVG
- Temperature Max AVG
- Snow Depth AVG
- Snow AVG
- precipitation AVG

### Machine Learning Model:  
Overall accuracy decreased from ML_Fire, with the most significant change being predictions in class 3 fire severity.

### Results (RFC):

<img width="569" alt="Screen Shot 2021-11-22 at 10 45 09 PM" src="https://user-images.githubusercontent.com/691355/142980996-d3256e5b-ad15-4d89-82ca-bbbf7d8959f9.png">

### Results (SMOTEENN):

<img width="674" alt="Screen Shot 2021-11-22 at 10 46 07 PM" src="https://user-images.githubusercontent.com/691355/142981096-18589f39-1183-48a4-8f10-cd3a61ee80f0.png">

## Machine Learning Model - ML_fireweatheravgprcp

### ETL: None

### Feature Enineering Changes (Target): None

### Feature Enineering Changes (Features):  
Added new row containing average aggregated precipitation average and dropped precipitation average.


### Machine Learning Model:  
Overall accuracy decreased from ML_Fire and ML_fireandweather, with the most significant change being predictions in class 3 fire severity.

### Results (RFC):

<img width="478" alt="Screen Shot 2021-11-22 at 10 52 48 PM" src="https://user-images.githubusercontent.com/691355/142981739-cb4bce27-0faf-41ca-a0e2-92bcdc3d6a5b.png">


### Results (SMOTEENN):

![Uploading Screen Shot 2021-11-22 at 10.53.27 PM.png…]()

# Summary

Overall this was a really intriguing project. We learned a lot about wildfire data and the many variables involved in determining where and how far a wildfire might spread. While our models didn't reach a level to be able to truly predict the spread of a wildfire, we were able to build a foundational model from which other people might develop further.
