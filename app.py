# Initial Import of Dependencies
from flask import Flask , render_template, jsonify, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://jrufhfiejfajri:9a7254d2151b5e3c280fe275dbba039acdc9190fbc167f64c564c449ca77af88@ec2-52-200-155-213.compute-1.amazonaws.com:5432/d3r8dfuncb78iv"

db = SQLAlchemy(app)

@app.route('/')
def welcome():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
