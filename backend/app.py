from flask import Flask, request, jsonify
from flask_cors import CORS  
from transformers import BlenderbotForConditionalGeneration, BlenderbotTokenizer

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load the model and tokenizer
model_name = "facebook/blenderbot-400M-distill"
tokenizer = BlenderbotTokenizer.from_pretrained(model_name)
model = BlenderbotForConditionalGeneration.from_pretrained(model_name)

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_input = request.json.get("message", "").strip()

        if not user_input:
            return jsonify({"error": "Empty input received", "response": ""}), 400

        # Encode input and generate response
        inputs = tokenizer(user_input, return_tensors="pt")
        reply_ids = model.generate(**inputs)
        response = tokenizer.decode(reply_ids[0], skip_special_tokens=True)

        return jsonify({"response": response})

    except Exception as e:
        return jsonify({"error": str(e), "response": ""}), 500

if __name__ == '__main__':
    app.run(debug=True)
