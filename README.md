# Predict_Wildfire_Spread

# Challenge Summary

## Project Overview - Predict Wildfire Spread

The purpose of this project is to try to predict where and how quickly a wildfire will spread based on
- fuel type
- weather patterns (wind, temperature, precipitation, drought conditions, . . .)
- location
- accessibility
- geography

## Main Question

Can we predict where and how quickly a wildfire will spread when given the location of the wildfire?


### Questions arising from data

- Is there correlation between the amount of slashing (heavy, medium, thinning) and the size of a wildfire?
- 

## Resources

-  Data Files on Heroku:
    -  wildfire_data
        - Data from the Oregon Department of Forestry with data from 1990 to 2021 
    -  noaa_data
        -  Weather data from the National Oceanic and Atmospheric Administration(NOAA) from 2008 to 2020
    
-  Data Sources:
    - [NOAA Documentation](https://www1.ncdc.noaa.gov/pub/data/cdo/documentation/GHCND_documentation.pdf)
    - [Weather Data - Noaa Search Tool](https://www.ncdc.noaa.gov/cdo-web/search?datasetid=GHCND)
    - [Oregon Wildfire Data](https://apps.odf.oregon.gov/DIVISIONS/protection/fire_protection/fires/FIRESlist.asp)
    - 

# Predict Wildfire Spread Analysis

  - [Simple ML.ipynb](ML_Simple.ipynb)
    - Uses Jupyter Notebook to connect to our Heroku database to pull wildfire data and runs a random forest classifier
  - [noaa_data_payground.ipynb](https://colab.research.google.com/drive/1VAWK816E8hy7tyfbFem6Q9Z6DEXCUf_o#scrollTo=0Rzd3OD_kQlU)
     - Uses Google Colab to connect to our Heroku database and pull noaa_data and begin data cleaning. We will join the wildfire data and the NOAA data as we continue on with the project.

## Software/Languages:  

## (Additional Diagrams, Resources, etc)

## Predict Wildfire Spread  - Results

### Preliminary findings 11.06.2021 

#### Feature Importance from Random Classifier 11.06.2021
- Longitude/Latitude/fire_year - shows the greatest weight on fire size (0.017 - 0.36)

##### General Cause of Fire
- Equipment use shows the greatest weight for cause of wildfire (0.009)
    - Considering binning "general cause" of fire into two categories: human causes and natural causes

##### Fuel Model (A - X)
- "Annual Grasses" (A) show the greatest weight on fire size (0.009)
- "Dense Chaparral" (B) show the least weight on fire size (0.001)


## Predict Wildfire Spread  - Summary
