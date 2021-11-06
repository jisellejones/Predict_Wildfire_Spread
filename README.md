# Predict_Wildfire_Spread

# Challenge Summary

## Communication Protocols
- Jiselle will merge all pull requests to the main branch
- Jiselle will check the repo each day for pull requests
- Team members will also communicate via meetings or chats when branches are ready to be merged
- 
- Team will meet at  
- Team

## Project Overview - Predict Wildfire Spread

The purpose of this project is to try to predict where and how quickly a wildfire will spread based on
- fuel type
- weather patterns (wind, temperature, precipitation, drought conditions, . . .)
- location
- accessibility
- geography

## Main Question

Can we predict where and how quickly a wildfire will spread when given the location of the wildfire?

## Reason for topic selection
- Wildfires have seemed to be increasing over time in both frequency and intensity. These wildfires impact the lives of humans and animals in surrounding cities and states. The massive loss of forest and greenery may also accelerate the impacts of climate change. If we can predict the location, size, and spread of a wildfire, we may be able to decrease the amount of natural life lost.

### Questions arising from data

- Is there correlation between the amount of slashing (heavy, medium, thinning) and the size of a wildfire?
- Is there correlation between the average or median precipitation of the month the fire starts and the fire size?
- Is there correlation between the average or median precipitation of the year prior to the start of the fire and the fire size?
- How much correlation or difference is there in correlation between the fuel type and the fire size?
- Is there a way to determine the direction the fire will move from where it started?
- Can we predict the fire size using a supervised model, show it on a map and then overlay wind speed/direction to possibly indicate the fire location?
    - Then could we show surrounding cities/towns for possible resources or evacuation areas?

## Resources
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
    
-  Data Sources:
    - [NOAA Documentation](https://www1.ncdc.noaa.gov/pub/data/cdo/documentation/GHCND_documentation.pdf)
    - [Weather Data - Noaa Search Tool](https://www.ncdc.noaa.gov/cdo-web/search?datasetid=GHCND)
    - [Oregon Wildfire Data](https://apps.odf.oregon.gov/DIVISIONS/protection/fire_protection/fires/FIRESlist.asp)
    - 

# Provisional Machine Learning Model
  - [Simple ML.ipynb](ML_Simple.ipynb)
    - Uses Jupyter Notebook to connect to our Heroku database to pull wildfire data and runs a random forest classifier
  - [noaa_data_payground.ipynb](https://colab.research.google.com/drive/1VAWK816E8hy7tyfbFem6Q9Z6DEXCUf_o#scrollTo=0Rzd3OD_kQlU)
     - Uses Google Colab to connect to our Heroku database and pull noaa_data and begin data cleaning. We will join the wildfire data and the NOAA data as we continue on with the project.

## Software/Languages:  


## Predict Wildfire Spread  - Results
- Preliminary findings 11.06.2021 
    - Feature Importance from Random Classifier 11.06.2021
        - Longitude/Latitude/fire_year - shows the greatest weight on fire size (0.017 - 0.36)
    - General Cause of Fire
        - Equipment use shows the greatest weight for cause of wildfire (0.009)
            - Considering binning "general cause" of fire into two categories: human causes and natural causes
    - Fuel Model (A - X)
        - "Annual Grasses" (A) show the greatest weight on fire size (0.009)
        - "Dense Chaparral" (B) show the least weight on fire size (0.001)

## Analysis
## (Additional Diagrams, Resources, etc)
## Predict Wildfire Spread  - Summary
