# Predict Wildfire Spread Analysis

## Project Overview - Predict Wildfire Spread 

## Resources
-  Data Files:

## Software/Languages:
-  SQL
-  Python 3.7
-  Google Colab
-  VSCode 1.62.0
-  PGAdmin 5.2
-  Heroku
-  Scikit learn
-  Future use (Java Script, JSON, Tableau, HTML)
  


## (Additional Diagrams, Resources, etc)
 - [NOAA Column Heading Definition](Resources/noaa_col_key.pdf)

# Challenge Summary
- Finding usable data - reviewed data on several different platforms.  Data formats where the biggest hurrdle.  Found 2 sources that provided data in .csv
- Merging weather data - downloaded data by county (37 total) for the state of Oregon which resulted in over 1 million rows of data.  Initially tried to merge via PGAdmin.  Due to varying column inclusion by county, the schema would have been 40+ columns wide.  Due to the data width, the team pivoted to using pandas to merge the data which was more efficient. 
- Determination of useful variables - Currently working on the proper threshold level to determine whether to keep certain columns based upon % of NaN.


## Predict Wildfire Spread  - Results


## Predict Wildfire Spread  - Summary
