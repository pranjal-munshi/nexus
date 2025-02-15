from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

# MongoDB connection
client = MongoClient("mongodb+srv://rachitv106:Rachit2619@cluster0.qnnzbrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["PayPlan"]
users_collection = db["Users"]


@app.route("/api/signup", methods=["POST"])
def add_user():
    try:
        user_data = request.get_json()
        required_fields = ["name", "email", "dob", "pin", "password", "amount"]
        for field in required_fields:
            if field not in user_data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        users_collection.insert_one(user_data)
        # Ensure explicit success message
        return jsonify({"message": "User signed up successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route("/api/pay", methods=["POST"])
def pay():
    data = request.json
    from_user_id = data.get("fromUserId")
    to_user_id = data.get("toUserId")
    amount = data.get("amount")

    if not from_user_id or not to_user_id or not amount:
        return jsonify({"message": "Missing required fields"}), 400

    try:
        # Start a session
        with client.start_session() as session:
            with session.start_transaction():
                # Find both users
                from_user = users_collection.find_one({"name": from_user_id}, session=session)
                to_user = users_collection.find_one({"name": to_user_id}, session=session)

                if not from_user or not to_user:
                    return jsonify({"message": "User not found"}), 404

                if from_user["amount"] < amount:
                    return jsonify({"message": "Insufficient balance"}), 400

                # Update the user balances
                users_collection.update_one(
                    {"name": from_user_id},
                    {"$inc": {"amount": -amount}},
                    session=session
                )
                users_collection.update_one(
                    {"name": to_user_id},
                    {"$inc": {"amount": amount}},
                    session=session
                )

        return jsonify({"message": "Payment successful"}), 200

    except Exception as e:
        return jsonify({"message": "Payment failed", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=8000, debug=True)
