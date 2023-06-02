from flask import Flask, request, jsonify
import pandas as pd
from pymongo import MongoClient
from datetime import datetime
from bson import json_util
from urllib.parse import quote
import json
import matplotlib.pyplot as plt
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']  # Replace 'mydatabase' with your database name
new_form_data = db['form_data']



@app.route('/')
def home():
    return "hii"

@app.route('/upload', methods=['POST'])
def upload_file():
    name = request.form.get('name')
    file = request.files['file']
    if file and name:
        # Extract the file name and extension
        file_name = file.filename

        # Record the upload time
        upload_time = datetime.now().strftime('%d-%m-%Y')

        # Read the Excel file using pandas
        df = pd.read_excel(file)

        # Create a dynamic MongoDB collection with name, filename, and upload time
        collection_name = f'{name}_{file_name}_{upload_time}'  # Combine name, filename, and upload time
        collection = db[collection_name]

        collection.insert_many(df.to_dict('records'))

        response = {
            'success': True,
            'message': f'Successfully uploaded {file_name} as the "{collection_name}" collection in MongoDB at {upload_time}!'
        }
        return jsonify(response)
    else:
        response = {
            'success': False,
            'message': 'No file uploaded or name provided.'
        }
        return jsonify(response)


@app.route('/excels', methods=['GET'])
def get_all_excels():
    # Get a list of all collections in the database
    collection_names = db.list_collection_names()

    # Filter the collection names to only include Excel files
    excel_collections = [name for name in collection_names if 'xlsx' in name]

    return {'excels': excel_collections}

@app.route('/excel/<name>', methods=['GET'])
def get_single_excel(name):
    # Search for the specific Excel file collection
    collection_name = quote(name)
    collection = db[collection_name]

    # Retrieve the documents from the collection
    documents = collection.find()

    df = pd.DataFrame(documents)
    
    # Count values in each column
    column_counts = {}
    for column in df.columns:
        value_counts = df[column].value_counts().to_dict()
        
        # Convert keys to a hashable type
        cleaned_value_counts = {}
        for key, value in value_counts.items():
            cleaned_key = str(key) if not isinstance(key, datetime) else key.strftime('%Y-%m-%d %H:%M:%S')
            cleaned_value_counts[cleaned_key] = value
        
        column_counts[column] = cleaned_value_counts
    
    # Extract key-value pairs where the value is greater than 1
    result = {}
    for key, value in column_counts.items():
        if isinstance(value, dict):
            filtered_values = {k: v for k, v in value.items() if v > 1}
            if filtered_values:
                result[key] = filtered_values
        elif value > 1:
            result[key] = value
    print(result)
    return jsonify(result)



@app.route("/save_form", methods=["POST"])
def save_form():
    # Get the form data
    form_data = request.get_json()

    # Save the form data to the database
    new_form_data.insert_one(form_data)

    response = {
        'success': True,
        'message': 'Form data saved successfully!'
    }
    return jsonify(response)

    
@app.route('/formdata', methods=['GET'])
def get_form_data():

    # Retrieve the documents from the collection
    documents = new_form_data.find()

    df = pd.DataFrame(documents)
    
    # Count values in each column
    column_counts = {}
    for column in df.columns:
        value_counts = df[column].value_counts().to_dict()
        
        # Convert keys to a hashable type
        cleaned_value_counts = {}
        for key, value in value_counts.items():
            cleaned_key = str(key) if not isinstance(key, datetime) else key.strftime('%Y-%m-%d %H:%M:%S')
            cleaned_value_counts[cleaned_key] = value
        
        column_counts[column] = cleaned_value_counts
    
    # Extract key-value pairs where the value is greater than 1
    result = {}
    for key, value in column_counts.items():
        if isinstance(value, dict):
            filtered_values = {k: v for k, v in value.items() if v > 1}
            if filtered_values:
                result[key] = filtered_values
        elif value > 1:
            result[key] = value
    print(result)
    return result



    

# Run the application
if __name__ == '__main__':
    app.run(debug=True)
