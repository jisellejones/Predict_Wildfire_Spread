# Initial Import of Dependencies
import os
import json
from flask import Flask , render_template, jsonify, request, redirect, url_for
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from config import connection_string, connection_string2
from decimal import Decimal

app = Flask(__name__)

# Connecting to database
engine = create_engine(connection_string)

class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return json.JSONEncoder.default(self, obj)

# Creating home route
@app.route('/')
def home():
    return render_template("index.html")

# "about" page - just checking it out - we may not use it
@app.route("/about")
def about():
    return render_template('about.html')

# Office hours connect 
@app.route("/api/wildfire/severity/<severity_level>")
def wildfire(severity_level):
    connection = engine.connect()
    query = connection.execute(f"SELECT * FROM prediction_results_1 WHERE actual_fire_severity = {severity_level}")
    obj = [{column: value for column, value in rowproxy.items()} for rowproxy in query]
    return json.dumps(obj, cls=JSONEncoder)

    # add if statements - if xx = null

@app.route("/api/features/fire")
def fireonly():
    connection = engine.connect()
    query = connection.execute(f"SELECT * FROM feature_importance_fire")
    obj = [{column: value for column, value in rowproxy.items()} for rowproxy in query]
    return json.dumps(obj, cls=JSONEncoder)

@app.route("/api/features/fireweather")
def fireweather():
    connection = engine.connect()
    query = connection.execute(f"SELECT * FROM feature_importance_fireweather")
    obj = [{column: value for column, value in rowproxy.items()} for rowproxy in query]
    return json.dumps(obj, cls=JSONEncoder)

@app.route("/api/features/avgprcp")
def avgprcp():
    connection = engine.connect()
    query = connection.execute(f"SELECT * FROM feature_importance_fireweatheravgprcp")
    obj = [{column: value for column, value in rowproxy.items()} for rowproxy in query]
    return json.dumps(obj, cls=JSONEncoder)

if __name__ == "__main__":
    app.run(debug=True)
