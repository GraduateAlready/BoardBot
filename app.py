'''app.py'''
import string
import os
# import json
import random


#importing pyhton modules
from flask_migrate import Migrate


from flask import Flask, request, session, render_template, jsonify
from flask_cors import CORS, cross_origin

#importing Google OAuth which enables login using "Sign in with Google"
from google.oauth2 import id_token
from google.auth.transport import requests
from flask_sqlalchemy import SQLAlchemy

# serving the Flask Shell App using CORS
app = Flask(__name__, static_folder="build/static", template_folder="build")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# In a nutshell, hackers can use a rainbow table against your session to
# find out the secret key and parrot your app.
app.secret_key = '-' \
                    .join(random.choices(string.ascii_uppercase + \
                    string.digits, k=10))

# URI = "postgresql://postgres:admin@localhost/postgres"  # or other relevant config var
uri = os.getenv("DATABASE_URL")
if uri and uri.startswith("postgres://") :
    uri = uri.replace("postgres://", "postgresql://")

# Replace with your client ID later.
CLIENT_ID = os.getenv("REACT_APP_GOOGLE_CLIENT_ID")

# sqlalchemy to enable connection to the database uri
app.config["DATABASE_URL"] = uri
app.config["SQLALCHEMY_DATABASE_URI"] = uri


app.config["SQLALCHEMY_ECHO"] = False
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

migrate = Migrate(app, db)

# database model for storing user data
class User(db.Model):
    '''User Model'''
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    email = db.Column(db.String())

    def __init__(self, idx, name, email):
        self.id = idx
        self.name = name
        self.email = email

    def __repr__(self):
        return f"<id {self.id}>"

#  self-serialization  of the database fields
    def serialize(self):
        '''serialize'''
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email
        }

@app.route('/api/authenticated_endpoint', methods=['POST'])
@cross_origin()
def authenticated_endpoint():
    '''authenticated_endpoint'''
    request_data = request.get_json()
    token = request_data['token']
    res = {}
    if 'user' in session:
        user = session['user']
        if token == user:
            res = {
                'email': user
            }
        else:
            res = {
                'error': 'token is invalid!'
            }
    # json_res = json.dumps(res)
    json_res = jsonify(res)
    return json_res

def set_token(token):
    '''set_token'''
    res = {}
    session_user = ""
    print("token", token)
    print("CLIENT_ID", CLIENT_ID)
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        id_info = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        print("id_info", id_info)
        # Create the session
        session_user = id_info['email']
        session["user"] = id_info['email']
        res = {
            "token": session_user
        }
    except ValueError as ex:
        res = {
            "error": ex
        }
        print("error", ex)
        # Invalid token

    return res

@app.route("/")
def hello():
    '''Main Page'''
    return render_template('index.html')

# Enable CORS so frontend (localhost:3000) can communicate with backend (localhost:5000)
@app.route('/api/auth', methods=['POST'])
@cross_origin()
def google_sign_in():
    '''google_sign_in'''
    request_data = request.get_json()
    idx = random.randint(1,300)
    token = request_data['token']
    name = request_data['name']
    email = request_data['login']
    res = {}

    user=User.query.filter_by(email=email).first()

# setting the token 

    if user:
        res = set_token(token)
    else :
        user=User(
            idx=idx,
            name=name,
            email=email
        )
        db.session.add(user)
        db.session.commit()

        res = set_token(token)

    # convert into JSON:
    # json_res = json.dumps(res)
    print("res", res)
    json_res = jsonify(res)

    return json_res

@app.route("/api/migrate")
def migrate_db():
    """migrate"""
    db.create_all()
    db.session.commit()

    return "DB migration is done"
    
# app main
if __name__ == '__main__':
    app.run(debug=True)
