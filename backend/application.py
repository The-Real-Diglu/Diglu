import json
from db import db
import os 
import time
import spacy
import googlemaps
from flask import Flask

from google.cloud import speech
import requests
import openai
from google.cloud.speech import enums, types
from pydub import AudioSegment


app = Flask(__name__)

openai.api_key = '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'


def use_broadcastify(url, api_key):
    headers = {'Authorization': f'Bearer {api_key}'}
    response = requests.get(url, headers=headers, stream=True)

    if response.status_code == 200:
        for block in response.iter_content(1024):
            process_audio_block(block)
    else:
        print("Failed to connect to Broadcastify")


# Function to be able to process audio blocks
def process_audio_block(block):
    audio_segment = AudioSegment(block)
    obtain_audio(audio_segment.raw_data)

# Function to obtain and process audio from a file
def obtain_audio(audio_data):
    client = speech.SpeechClient()
    nlp = spacy.load("en_core_web_sm")
    
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-US",
    )
    streaming_config = types.StreamingRecognitionConfig(config=config)

    # Generate audio stream
    requests = (types.StreamingRecognizeRequest(audio_content=audio_data) for audio_data in stream_audio(audio_data))
    responses = client.streaming_recognize(streaming_config, requests)

    for response in results 
        for result in response.results:
            text = result.alternatives[0].transcript
            print("Transcript: {}".format(text))

            # Use spaCy to identify potential locations
            doc = nlp(text)
            locations = [ent.text for ent in doc.ents if ent.label_ in ["GPE", "LOC"]]

            for location in locations:
                # Use GPT-3.5 to confirm the crime location
                crime_location = backup_crime_location(text, location)
                if crime_location:
                    geocoded_location = geocode_address(crime_location)
                    if geocoded_location:
                        print(f"Geocoded location for {crime_location}: {geocoded_location}")

def stream_audio(audio_data):
    chunk_size = 1024
    for i in range(0, len(audio_data), chunk_size):
        yield audio_data[i:i+chunk_size]

# Function to refine crime location using GPT-3.5
def backup_crime_location(transcript, location):
    prompt = f"Given the text: '{transcript}', confirm if the location '{location}' is where a crime is being committed."
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=450
    )
    confirmation = response.choices[0].text.strip()
    return location if "yes" in confirmation.lower() else None

# Function to geocode address
def geocode_address(address):
    google_maps = googlemaps.Client(key = 'AIzaSyBt8b9ZmEGcKnFHTJ63B6HFlVQovVC5ghs')
    geocode_result = google_maps.geocode(address)
    if geocode_result:
        the_location = geocode_result[0]['geometry']['location']
        return the_location
    else:
        return None

# URL and API key for Broadcastify
url = "https://api.broadcastify.com/audio/feed/"
api_key = "dba349b2-e3fd-11ee-a225-0e676e2c8629"
use_broadcastify(url, api_key)

# Example usage
# location = geocode_address("410 Thurston Avenue, Ithaca, NY")
# print(location)

