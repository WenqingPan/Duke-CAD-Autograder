from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


@app.route("/home")
def home():
    return {"name": ["james", "mike"]}

if __name__ == "__main__":
    app.run(debug=True)