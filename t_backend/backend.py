from flask import Flask, request, jsonify
from pymongo import MongoClient
from werkzeug.security import generate_password_hash
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS


# MongoDB connection
client = MongoClient("mongodb+srv://rachitv106:Rachit2619@cluster0.qnnzbrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["PayPlan"]
users_collection = db["Users"]

# Sample users to insert
users = [
    {
        "userId": "123455678",
        "name": "Alice Johnson",
        "dob": datetime.strptime("1990-03-15", "%Y-%m-%d"),
        "pin": generate_password_hash("1234"),
        "amount": 1500
    },
    {
        "userId": "123455679",
        "name": "Bob Smith",
        "dob": datetime.strptime("1988-07-22", "%Y-%m-%d"),
        "pin": generate_password_hash("5678"),
        "amount": 2300
    },
    {
        "userId": "123455680",
        "name": "Charlie Brown",
        "dob": datetime.strptime("1995-10-05", "%Y-%m-%d"),
        "pin": generate_password_hash("9012"),
        "amount": 800
    }
]

# Route to insert sample users
@app.route("/api/addSampleUsers", methods=["POST"])
def add_sample_users():
    try:
        users_collection.insert_many(users)
        return jsonify({"message": "Sample users added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=8000, debug=True)
