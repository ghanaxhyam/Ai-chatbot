from flask import Flask, request, jsonify
from flask_cors import CORS 
import subprocess# Enable CORS

import main  # Import your existing main.py file

app = Flask(__name__)
CORS(app) 

@app.route('/chat', methods=['POST'])
def chatbot():
    user_message = request.json['message']
    # Call your existing chatbot logic (as a function):
    bot_response = main.get_chatbot_response(user_message)
    subprocess.call(['say', bot_response]) 
    return jsonify({'response': bot_response})
    
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)

