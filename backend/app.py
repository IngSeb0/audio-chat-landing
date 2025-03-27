from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Set OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/api/generate-questions', methods=['GET'])
def generate_questions():
    role = request.args.get('role')
    interview_type = request.args.get('interview_type')
    experience_level = request.args.get('experience_level')

    if not role or not interview_type or not experience_level:
        return jsonify({"error": "Missing required parameters"}), 400

    prompt = f"Generate a list of interview questions for a {experience_level} {role} in a {interview_type} interview."
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.7
        )
        questions = response.choices[0].text.strip().split("\n")
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
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.7
        )
        feedback = response.choices[0].text.strip()
        return jsonify({"feedback": feedback})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
