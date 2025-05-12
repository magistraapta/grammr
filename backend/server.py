from google import genai
from dotenv import load_dotenv
import os
from model import *
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json


app = FastAPI()
load_dotenv()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# take an input and generate response from gemini model
@app.post("/", response_model=ResponseModel)
async def sendInput(input: InputModel):
    

    prompt = f"""
    You are an agent that corrects people's sentences.
    Fix this sentence: "{input.text_input}".
    Make the output in JSON format, including grammar correction and personalized advice.

    Follow this JSON schema:
    {{
        "corrected_sentence": "Corrected sentence",
        "personalized_advice": {{
            "improvement": "What to improve",
            "tips": "Tip for better writing",
            "example": "Example of correct usage"
        }}
    }}

    """

    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt,
        config={
            'response_mime_type': 'application/json',
            'response_schema': ResponseModel
        }
    )
    
    try:
        resposne_data = json.loads(response.text)
        return ResponseModel(**resposne_data)
    except json.JSONDecodeError:
        return {"error": "invalid response from gemini api"}



