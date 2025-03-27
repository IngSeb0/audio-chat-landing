from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from elevenlabs.client import ElevenLabs
from elevenlabs.conversational_ai.conversation import Conversation
from elevenlabs.conversational_ai.default_audio_interface import DefaultAudioInterface
from elevenlabs.conversational_ai.conversation import AudioInterface

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# ElevenLabs API configuration
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY", "sk_e6508c9221e8e86d10546822dabd9d062124ca63a7e0150f")  # Replace with your actual API key
client = ElevenLabs(api_key=ELEVENLABS_API_KEY)

# Ensure the client is initialized correctly
if not ELEVENLABS_API_KEY:
    raise ValueError("ELEVENLABS_API_KEY is not set. Please provide a valid API key.")

# Custom AudioInterface that disables audio handling
class NoOpAudioInterface(AudioInterface):
    def start(self, input_callback=None):
        # Accepts a callback but does nothing
        pass

    def stop(self):
        pass

    def send_audio(self, audio_data):
        pass

    def should_stop(self):
        return True

    def interrupt(self):
        pass

    def output(self, audio_data):
        pass

# Ensure the agent_id is initialized correctly
agent_id = os.getenv("AGENT_ID", "EfdtwSw4SOifXqmjv6ry")  # Replace with your actual agent ID
if not agent_id:
    raise ValueError("AGENT_ID is not set. Please provide a valid agent ID.")

# Initialize ElevenLabs Conversation
audio_interface = NoOpAudioInterface()  # Custom no-op audio interface
conversation = Conversation(
    client=client,
    agent_id=agent_id,
    requires_auth=bool(ELEVENLABS_API_KEY),
    audio_interface=audio_interface,  # Use the custom no-op audio interface
    # Callbacks for handling responses and user interactions
    callback_agent_response=lambda response: print(f"Agent: {response}"),
    callback_agent_response_correction=lambda original, corrected: print(f"Agent: {original} -> {corrected}"),
    callback_user_transcript=lambda transcript: print(f"User: {transcript}"),
    # Uncomment if you want to see latency measurements
    # callback_latency_measurement=lambda latency: print(f"Latency: {latency}ms"),
)

def generate_text_with_elevenlabs(prompt):
    try:
        # Variable para almacenar la respuesta del agente
        agent_response = []

        # Callback para capturar la respuesta del agente
        def handle_agent_response(response):
            print(f"Agent response: {response}")
            agent_response.append(response)

        # Crear una nueva instancia de conversación con el callback
        conversation_with_callback = Conversation(
            client=client,
            agent_id=agent_id,
            requires_auth=bool(ELEVENLABS_API_KEY),
            audio_interface=audio_interface,
            callback_agent_response=handle_agent_response
        )

        # Iniciar la sesión
        conversation_with_callback.start_session()

        # Enviar el mensaje al agente
        print(f"Sending prompt to agent: {prompt}")
        conversation_with_callback.audio_interface.start(lambda _: prompt)

        # Esperar a que la sesión termine
        conversation_id = conversation_with_callback.wait_for_session_end()
        print(f"Conversation ID: {conversation_id}")

        # Verificar si se recibió una respuesta
        if not agent_response:
            raise ValueError("No response received from ElevenLabs SDK.")

        # Retornar la respuesta del agente
        return agent_response[0]
    except Exception as e:
        # Asegurarse de finalizar la sesión en caso de error
        print(f"Error in generate_text_with_elevenlabs: {e}")
        raise e
   

@app.route('/api/generate-questions', methods=['GET'])
def generate_questions():
    role = request.args.get('role')
    interview_type = request.args.get('interview_type')
    experience_level = request.args.get('experience_level')

    if not role or not interview_type or not experience_level:
        return jsonify({"error": "Missing required parameters"}), 400

    prompt = f"Generate a list of interview questions for a {experience_level} {role} in a {interview_type} interview."
    try:
        questions = generate_text_with_elevenlabs(prompt).split("\n")
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
        feedback = generate_text_with_elevenlabs(prompt)
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

        # Use ElevenLabs SDK to generate a response
        response = generate_text_with_elevenlabs(message)

        print("Response from ElevenLabs SDK:", response)

        # Enviar la respuesta al frontend
        return jsonify({"response": response})
    except Exception as e:
        print("Internal server error:", str(e))
        return jsonify({"error": "Internal server error."}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
