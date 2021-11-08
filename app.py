# Initial Import of Dependencies
from flask import Flask, render_template, jsonify, request, redirect, url_for, 
from flask_sqlalchemy import SQLAlchemy

engine = pg.connect("dbname='d3r8dfuncb78iv' user='jrufhfiejfajri' host='ec2-52-200-155-213.compute-1.amazonaws.com' port='5432' password='9a7254d2151b5e3c280fe275dbba039acdc9190fbc167f64c564c449ca77af88'")
fire_df = pd.read_sql('select * from wildfire_data', con=engine)
noaa_df = pd.read_sql('select * from noaa_data', con=engine)

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config = ['SQLALCHEMY_DATABASE_URI'] = "postgres://jrufhfiejfajri:9a7254d2151b5e3c280fe275dbba039acdc9190fbc167f64c564c449ca77af88@ec2-52-200-155-213.compute-1.amazonaws.com:5432/d3r8dfuncb78iv"] 

db = SQLAlchemy(app)

@app.route('/')
def welcome():
    return(
    '''
    Welcome to the Wildfire Prediction Page!
    Available Routes:
    /api/v1.0/precipitation
    /api/v1.0/stations
    /api/v1.0/tobs
    /api/v1.0/temp/start/end
    ''')

if __name__ == "__main__":
    app.run(debug=True)
