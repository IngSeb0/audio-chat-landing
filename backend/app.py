from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize Hugging Face pipeline
chat_model = pipeline("text-generation", model="gpt2")

@app.route('/api/generate-questions', methods=['GET'])
def generate_questions():
    role = request.args.get('role')
    interview_type = request.args.get('interview_type')
    experience_level = request.args.get('experience_level')

    if not role or not interview_type or not experience_level:
        return jsonify({"error": "Missing required parameters"}), 400

    prompt = f"Generate a list of interview questions for a {experience_level} {role} in a {interview_type} interview."
    try:
        response = chat_model(prompt, max_length=150, num_return_sequences=1)
        questions = response[0]["generated_text"].strip().split("\n")
        return jsonify({"questions": questions})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/evaluate-answer', methods=['POST'])
def evaluate_answer():
    data = request.get_json()
    answer = data.get('answer')

    if not answer:
        return jsonify({"error": "Missing required parameter: answer"}), 400

    prompt = f"Evaluate the following interview answer for clarity, structure, and content:\n\n{answer}\n\nProvide detailed feedback."
    try:
        response = chat_model(prompt, max_length=150, num_return_sequences=1)
        feedback = response[0]["generated_text"].strip()
        return jsonify({"feedback": feedback})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/openai-chat", methods=["POST"])
def openai_chat():
    try:
        data = request.get_json()
        message = data.get("message")

        if not message:
            return jsonify({"error": "Message is required."}), 400

        print("Message received from client:", message)

        # Use Hugging Face model to generate a response
        response = chat_model(message, max_length=150, num_return_sequences=1)

        print("Response from Hugging Face model:", response)

        return jsonify({"response": response[0]["generated_text"].strip()})
    except Exception as e:
        print("Internal server error:", str(e))
        return jsonify({"error": "Internal server error."}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
